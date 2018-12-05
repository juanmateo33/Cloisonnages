import React from 'react';


function TaskItem(props) {
    const beginning = props.task.beginning;
    var myBeginning = new Date(beginning);
    const end = props.task.end;
    var myEnd = new Date(end);
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
        <td className="beginning">{myBeginning.toString().substring(0,21)}</td>
        <td className="end">{myEnd.toString().substring(0,21)}</td>
        {renderDone()}
      </tr>
    );
}


export default TaskItem;
