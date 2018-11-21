import React, { Component } from 'react';
import TaskItem from './TaskItem';

class Tasks extends Component {
  render() {
    let taskItems;
    if(this.props.tasks){
      taskItems = this.props.tasks.map(task =>{
        console.log(task);
        return(
          <TaskItem key={task.id} task={task} />
        )
      })
    }
    return (
      <div className="Tasks">
          <h3>Next cloisonnages</h3>
          {taskItems}
      </div>
    );
  }
}

export default Tasks;
