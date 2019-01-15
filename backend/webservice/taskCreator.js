const moment = require("moment");

const misc = require("./Parsers/misc");

function createTask(event1, event2){

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    if(event1.roomId.length>=3){
        state1 = 1; 
    }else {
        state1 = 2;
    }

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    if(event2.roomId.length>=3){
        state2 = 1; 
    }else {
        state2 = 2;
    }

    if(state1===state2){
        return null;
    }

    if(state1===1){
        return {
            operation: "Decloisonner",
            room: event1.roomId[0],
            beginning: event1.endDate,
            end: event2.startDate,
        }
    }

    return{
        operation: "Cloisonner",
        room: event1.roomId[0],
        beginning: event1.endDate,
        end: event2.startDate,
    }
}

function createTasks(eventArray) {

      // Check if there are events at all
    if (!eventArray) return [];

    if(eventArray.length===1){
        return [];
    }
    // Handle case when a single event is sent by GEODE: eventList needs
    // to be transformed into an array
    var arrayContent = [];

    for (var i = 1; i < eventArray.length-1; i++) {
        newEvent = createTask(eventArray[i],eventArray[i+1])
        if(newEvent!=null){
            arrayContent.push(newEvent);
        }
    }

    return arrayContent;
  }

  function uploadTasks(tasksArray){
    if(tasksArray.length<1){
        return;
    }
    for (var i = 0; i< tasksArray.length; i++) {
        //Post task into the database
    }
  }

  module.exports = { createTask, createTasks };