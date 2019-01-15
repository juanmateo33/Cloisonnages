const moment = require("moment");

const misc = require("./misc");

function compareStartDate(event1, event2) {
  if (event1.startDate.isSameOrAfter(event2.startDate)) return 1;
  return -1;
}

function parseEvent(event) {
  // Build Date objects startDate and endDate
  const startTime = misc.getPropertyRawValue(event, "DEB");
  const endTime = misc.getPropertyRawValue(event, "FIN");
  const date = misc.getPropertyRawValue(event, "DAT");

  const startDate = moment.utc(`${date}T${startTime}`);
  const endDate = moment.utc(`${date}T${endTime}`);

  return {
    id: event.NumEve,
    name: event.NomEve,
    //roomId: misc.getPropertyRawValue(event, "RES"),
    startDate,
    endDate,
  };
}

function parseEventList(eventList) {
  // Check if there are events at all
  if (!eventList) return [];

  // Handle case when a single event is sent by GEODE: eventList needs
  // to be transformed into an array
  const arrayContent = Array.isArray(eventList) ? eventList : [eventList];

  return arrayContent
    // .filter(event => event.EtaEve === config.active) // Only keep active events
    .map(parseEvent)
    .sort(compareStartDate); // Sort events by chronological order
}

module.exports = {
  parseEventList,
  parseEvent,
};