
function parseRoom(room) {
  //return important information about the room (id and name)
  return {
    id: room.NumRes,
    name: room.NomRes,
  };
}

//Parse a List of rooms filtered, only those which are modulables
function parseRoomList(roomList) {
  // Check if there are rooms at all
  if (!roomList) return [];

  // Handle case when a single room is sent by GEODE: roomList needs
  // to be transformed into an array
  const arrayContent = Array.isArray(roomList) ? roomList : [roomList];

  return arrayContent.map(parseRoom);
}

module.exports = {
  parseRoomList,
  parseRoom,
}; 