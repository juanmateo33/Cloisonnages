var express = require('express');
const connect = require("../webservice/connect");
const planning = require("../webservice/planning");
const packRooms = require("./packRooms");

var eventRouter = express.Router();

eventRouter.route('/:roomId')
.get( async (req,res,next) => {
    try {
        // Connect to GEODE
        const [session, agendaClient] = await Promise.all([connect.newSession(), connect.getClientAgenda()])
     
        // get Rooms
        const ListeRessources = await planning.getRoomsFiltered(agendaClient, session.guid,
            packRooms.getRoomVector(parseInt(req.params.roomId)));
        //res.send(ListeRessources);

            // Get events
        const ListeEvents = await planning.getTasks(
            agendaClient,
            session.guid,
            ListeRessources,
            parseInt(req.params.roomId)
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