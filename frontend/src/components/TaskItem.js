import React from 'react';

function TaskItem(props) {
    return (
      <li className="Task">
      {props.task.salle} - {props.task.action} - {props.task.day} - {props.task.hour}
      </li>
    );
}


export default TaskItem;
