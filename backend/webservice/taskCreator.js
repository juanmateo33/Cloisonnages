const moment = require("moment");

const config = require("./translatorConfig").event;
const misc = require("./misc");

function createTask(event1, event2){
    const startTime1 = misc.getPropertyRawValue(event1, config.startTime.CodPro);
    const endTime1 = misc.getPropertyRawValue(event1, config.endTime.CodPro);
    const date1 = misc.getPropertyRawValue(event1, config.date.CodPro);

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    const state1 = misc.getPropertyRawValue(event1, config.room.CodPro);

    const startDate1 = moment.utc(`${date1}T${startTime1}`);
    const endDate1 = moment.utc(`${date1}T${endTime1}`);

    const startTime2 = misc.getPropertyRawValue(event2, config.startTime.CodPro);
    const endTime2 = misc.getPropertyRawValue(event2, config.endTime.CodPro);
    const date2 = misc.getPropertyRawValue(event2, config.date.CodPro);

    //get the state of the room, asking for the room or directly by asking the state (don't know if possible)
    const state2 = misc.getPropertyRawValue(event2, config.room.CodPro);
  
    const startDate2 = moment.utc(`${date2}T${startTime2}`);
    const endDate2 = moment.utc(`${date2}T${endTime2}`);

    if(state1===state2){
        return;
    }

    if(state1===/*Cloisonné*/""){
        return {
            operation: "Decloisonner",
            room: event1.roomId,
            beginning: endDate1,
            end: startDate2,
        }
    }

    return{
        operation: "Cloisonner",
        room: event1.roomId,
        beginning: endDate1,
        end: startDate2,
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
        createTask(eventArray[i],eventArray[i+1])
        .then((newEvent) => {
            arrayContent.push(newEvent);
        });
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