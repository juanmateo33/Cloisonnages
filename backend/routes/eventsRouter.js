var express = require('express');
const connect = require("../webservice/connect");
const planning = require("../webservice/planning");

var eventRouter = express.Router();

eventRouter.route('/')
.get( async (req,res,next) => {
    try {
     // Connect to GEODE
     const [session, agendaClient] = await Promise.all([connect.newSession(), connect.getClientAgenda()])
     
     // get Rooms
     const ListeRessources = await planning.getRooms(agendaClient, session.guid);

     // Get events
    const ListeEvents = await planning.getRoomEvents(
         agendaClient,
         session.guid,
         ListeRessources
     )
     res.send(ListeEvents);

     if(session){
        connect.endSession(session);
      }
     
    } catch (err) {
        next(err)
  } finally {
      next();
  }
    
})

module.exports = eventRouter;