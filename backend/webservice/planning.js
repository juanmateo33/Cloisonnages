const {promisify} = require("util");
const misc = require("./misc");
const roomParser = require("./roomParser");

async function getRooms(client, guid) {
    const response = await promisify(client.ListerRessources)({ guid });
    // il faudra ne garder que les salles modulables avec detail Ressource
    const resourceList = misc.readXML(response.ListerRessourcesResult).ROOT.RES;
    const newList = [];
    for (let i=0; i<420; i++){
      // il faudra réussir à accéder à ressourceList.lenght();
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