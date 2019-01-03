const {promisify} = require("util");
const misc = require("./misc");
const roomParser = require("./roomParser");

async function getRooms(client, guid) {
    const response = await promisify(client.ListerRessources)({ guid });
    // il faudra ne garder que les salles modulables avec detail Ressource
    // const resourceList = misc.readXML(response.ListerRessourcesResult);
    const resourceList = response.ListerRessourcesResult;
    // return roomParser.parseRoomList(resourceList.ROOT.RES);
    return (resourceList);
  }

async function getRoomPlanning(
    client, 
    guid, 
    startDate, 
    endDate, 
    startHour, 
    endHour, 
    listeRessources){
  // startDate and endDate must be in ISO 8601 string format.
  // To convert a date object to an ISO 8601 string, use : date.toISOString()
  
    const response = await promisify(client.ListerEvenements)({
        guid,
        dateDebut: startDate,
        dateFin: endDate,
        heureDebut: startHour,
        heureFin: endHour,
        listeRessources: listeRessources
      });
    return response;
    
}

module.exports = {
    getRooms,
    getRoomPlanning
};