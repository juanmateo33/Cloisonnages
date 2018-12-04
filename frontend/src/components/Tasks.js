import React, { Component } from 'react';
import TaskItem from './TaskItem';

class Tasks extends Component {

  constructor() {
    super();
    this.state = { tasks: []}
  }



  componentWillMount(){
    this.setState({tasks: [
      {
        id: '1',
        salle: 'EF104',
        action: 'Cloisonnage',
        day: '12/03',
        hour: '12:20h'
      },
      {
        id: '2',
        salle: 'EF104',
        action: 'Decloisonnage',
        day: '12/03',
        hour: '15:20h'
      },
      {
        id: '3',
        salle: 'EF004',
        action: 'Cloisonnage',
        day: '14/04',
        hour: '18:20h'
      }
    ]})
  }
  
  render() {
    let taskItems;
    if(this.state.tasks){
      taskItems = this.state.tasks.map(task =>{
        return(
          <TaskItem key={task.id} task={task} />
        )
      })
    }
    return (
      <div className="Tasks">
          <h3>Tâches à réaliser</h3>
          {taskItems}
      </div>
    );
  }
}

export default Tasks;
