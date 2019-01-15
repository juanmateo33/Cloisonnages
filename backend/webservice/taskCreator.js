const moment = require("moment");

const misc = require("./Parsers/misc");

function createTask(event1, event2, roomId){

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    state1 = 2;
    state2 = 2;
    for(i=0;i<event1.roomId.length;i++){
        if(event1.roomId[i].ValPro==roomId||event1.roomId[i].ValPro==860){
            state1 = 1;     //State = 1 => Décloisonné
        }
    }

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    for(i=0;i<event2.roomId.length;i++){
        if(event2.roomId[i].ValPro==roomId||event2.roomId[i].ValPro==860){
            state2 = 1;     //State = 1 => Décloisonné
        }
    }

    if(state1===state2){
        return null;
    }

    if(state1===2){
        return {
            operation: "Decloisonner",
            room: roomId,
            beginning: event1.endDate,
            end: event2.startDate,
        }
    }

    return{
        operation: "Cloisonner",
        room: roomId,
        beginning: event1.endDate,
        end: event2.startDate,
    }
}

function createTasks(eventArray, roomId) {

      // Check if there are events at all
    if (!eventArray) return [];

    if(eventArray.length===1){
        return [];
    }
    // Handle case when a single event is sent by GEODE: eventList needs
    // to be transformed into an array
    var arrayContent = [];

    for (var i = 1; i < eventArray.length-1; i++) {
        newEvent = createTask(eventArray[i],eventArray[i+1], roomId)
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