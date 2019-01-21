const {promisify} = require("util");
const misc = require("./Parsers/misc");
const eventParser = require("./Parsers/eventParser");
const roomParser = require("./Parsers/roomParser");
const moment = require("moment");
const taskCreator = require("./taskCreator");

async function getRooms(client, guid) {
  const response = await promisify(client.ListerRessources)({ guid });
  const resourceList = misc.readXML(response.ListerRessourcesResult).ROOT.RES;
  // il faut ne garder que les salles modulables avec Pro: "124:153"
  const filteredList = resourceList.filter(room => misc.getPropertyRawValue(room, "124") == "153");
  const newList = roomParser.parseRoomList(filteredList);
  return (newList);
}

async function getRoomsFiltered(client, guid, admitedRooms) {
  const response = await promisify(client.ListerRessources)({ guid });
  const resourceList = misc.readXML(response.ListerRessourcesResult).ROOT.RES;
  // il faut ne garder que les salles modulables avec Pro: "124:153"
  const filteredList = resourceList.filter(room => misc.getPropertyRawValue(room, "124") == "153");
  const newList = roomParser.parseRoomList(filteredList);
  const tryList = newList.filter(room => admitedRooms.includes(room.id));
  return (tryList);
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

async function getTasks(
  client, 
  guid,  
  listeRessources,
  roomId){
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
const taskList = taskCreator.createTasks(newList,roomId);
return taskList;
}

module.exports = {
  getRooms,
  getRoomsFiltered,
  getRoomEvents,
  getTasks
};