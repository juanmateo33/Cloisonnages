const {promisify} = require("util");
const misc = require("./parsers/misc");

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