import React from 'react';


function RoomItem(props) {
    return (
      <tr className="Room">
        <td className="NumRes">{props.event.NumRes}</td>
        <td className="NomRes">{props.event.NomRes}</td>
      </tr>
    );
}


export default RoomItem;