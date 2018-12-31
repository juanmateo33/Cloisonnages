var express = require('express');
const connect = require("../webservice/connect");
const planning = require("../webservice/planning");

var eventRouter = express.Router();
/*
taskRouter.route('/')
//Get all tasks
.get( (req,res,next) => {
    try {
     // Connect to GEODE
     const session = await connect.newSession();
     connect.endSession(session);

     // get Rooms
     const ListeRessources = await planning.getRooms(session.client, session.guid);
     // Get events
     const ListeEvents = await planning.getRoomPlanning(
         session.client,
         session.guid,
         startDate,
         endDate,
         startHour,
         endHour,
         ListeRessources
     )
     send(ListeEvents);
    } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
    
})
*/
module.exports = eventRouter;