const { promisify } = require("util");
const _ = require("lodash");

const roomParser = require("./roomParser");

const misc = require("./misc");
const eventStapler = require("./eventStapler");
const config = require("./translatorConfig").room;

async function getAllRooms(client, guid) {
  const response = await promisify(client.ListerRessources)({ guid });
  const resourceList = misc.readXML(response.ListerRessourcesResult);
  return roomParser.parseRoomList(resourceList.ROOT.RES);
}

async function getRoomDetail(client, guid, idRessource) {
  const response = await promisify(client.DetailRessource)({
    guid,
    idRessource
  });
  const resource = misc.readXML(response.DetailRessourceResult);
  if (resource.RES !== undefined) {
    return roomParser.parseRoom(resource.RES);
  }
  return null;
}

async function getRoomDetailWithEvents(
  agendaClient,
  annuaireClient,
  guid,
  idRessource,
  selectedDate
) {
  const room = await getRoomDetail(agendaClient, guid, idRessource);
  const roomWithEvents = (await eventStapler.stapleToRoomList(
    agendaClient,
    annuaireClient,
    guid,
    [room],
    selectedDate
  ))[0];

  return roomWithEvents;
}

module.exports = {
  getRoomDetail,
  getRoomDetailWithEvents,
  getAllRooms
};