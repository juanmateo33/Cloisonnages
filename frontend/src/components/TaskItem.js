import React from 'react';


function TaskItem(props) {
    const start = props.task.start;
    const end = props.task.end;
    const done = props.task.done? "done" : "pending";
    
    function renderDone() {
      const now = new Date();
      const duration = props.task.end-now;
      if ("done" === done){
        return <td className="text-success">{done}</td>
      } else if ("pending" === done && duration/3600000<120 ) {
        return <td className="text-danger">{done}</td>
      } else {
        return <td className="text-warning">{done}</td>
      }
    }

    return (
      <tr className="Task">
        <td className="room">{props.task.room}</td>
        <td className="operation">{props.task.operation}</td>
        <td className="start">{start.toString().substring(0,21)}</td>
        <td className="end">{end.toString().substring(0,21)}</td>
        {renderDone()}
      </tr>
    );
}


export default TaskItem;
