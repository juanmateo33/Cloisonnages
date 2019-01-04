const {promisify} = require("util");
const misc = require("./parsers/misc");
const eventParser = require("./parsers/eventParser");
const moment = require("moment");

async function getRooms(client, guid) {
    const response = await promisify(client.ListerRessources)({ guid });
    const resourceList = misc.readXML(response.ListerRessourcesResult).ROOT.RES;
    // il faut ne garder que les salles modulables avec Pro: "124:153"
    const newList = [];
    for (i in resourceList){
      const room=resourceList[i];
      propertyvalue = misc.getPropertyRawValue(room, "124");
      if (propertyvalue=="153"){
        newList.push(room);
      }
    }
    return (newList);
  }

async function getRoomEvents(
    client, 
    guid,  
    listeRessources){
  // startDate and endDate must be in ISO 8601 string format.
  // To convert a date object to an ISO 8601 string, use : date.toISOString()

  const startDate = new Date()
  startDateUTC = moment(startDate)
    .utc()
    .format("YYYYMMDD");
  let endDate=new Date()
  endDate.setMonth(endDate.getMonth()+3);
  endDateUTC = moment(startDate)
  .utc()
  .format("YYYYMMDD");

  
    const response = await promisify(client.ListerEvenements)({
        guid,
        dateDebut: startDate.toISOString(),
        dateFin: endDate.toISOString(),
        listeRessources: listeRessources
      });
    const eventList = misc.readXML(response.ListerEvenementsResult).ROOT.EVE;
    const newList = eventParser.parseEventList(eventList); //parse and sort
    return newList;
    
}

module.exports = {
    getRooms,
    getRoomEvents
};