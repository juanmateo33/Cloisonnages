var express = require('express');
const connect = require("../webservice/connect");
const planning = require("../webservice/planning");

var roomRouter = express.Router();

roomRouter.route('/')
.get( async (req,res,next) => {
    try {
     // Connect to GEODE
     const [session, agendaClient] = await Promise.all([connect.newSession(), connect.getClientAgenda()])
     
     // get Rooms
     const ListeRessources = await planning.getRooms(agendaClient, session.guid);
     res.send(ListeRessources);
     if(session){
        connect.endSession(session);
      }
     // Get events
    /* const ListeEvents = await planning.getRoomPlanning(
         agendaClient,
         session.guid,
         startDate,
         endDate,
         startHour,
         endHour,
         ListeRessources
     )
     res.send(ListeEvents);*/
     
    } catch (err) {
        next(err)
  } finally {
      next();
  }
    
})

module.exports = roomRouter;