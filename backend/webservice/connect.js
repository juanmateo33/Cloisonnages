const config = require("./config");
const soap = require("soap");
const { promisify } = require("util");


async function getClient(url) {
    return promisify(soap.createClient)(url);
}

async function getGUID(sessionClient) {
    const guid = await promisify(sessionClient.InitSession)({
      login: config.webservice.user,
      password: config.webservice.password
    });

    // Error handling
    switch (guid) {
    case "-1":
      throw new Error(
          "failed to create GEODE session: login or password not provided (error -1)"
      );
    case "-2":
      throw new Error(
          "failed to create GEODE session: authentication failed (error -2)"
      );
    case "-3":
      throw new Error(
          "failed to create GEODE session: an issue occurred while fetching user (error -3)"
      );
    case "-4":
      throw new Error(
          "failed to create GEODE session: user's profile does not have the rights necessary to use this WebService (error -4)"
      );
    default:
      return guid;
  }
}

async function newSession() {
    const sessionClient = await getClient(config.webservice.sessionurl);
    const guidObject = await getGUID(sessionClient);
    const guid = guidObject.InitSessionResult;
    return {
      client: sessionClient,
      guid
    };
}

async function getClientAgenda(){
  const sessionClient = await getClient(config.webservice.sessionurl_agenda);
  return sessionClient
}
  
async function endSession(session) {
    const response = (await promisify(session.client.EndSession)({
      guid: session.guid
    })).EndSessionResult;
  
    // Error handling
    switch (response) {
      case -1:
        throw new Error("could not disconnect gracefully from GEODE");
      case 0:
        console.log('successfully disconnected')
        break;
      default:
      throw new Error("unknown error when disconnecting from GEODE");
    }
}
  
module.exports = {
    newSession,
    endSession,
    getClientAgenda
};