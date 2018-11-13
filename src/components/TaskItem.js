import React, { Component } from 'react';

class TaskItem extends Component {
  render() {
    return (
      <li className="Task">
      {this.props.task.salle} - {this.props.task.action} - {this.props.task.day} - {this.props.task.hour}
      </li>
    );
  }
}

export default TaskItem;
