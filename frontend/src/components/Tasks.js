import React, { Component } from 'react';
import TaskItem from './TaskItem';
require('react-datetime');

class Tasks extends Component {

  constructor() {
    super();
    this.state = { tasks: []}
  }



  componentWillMount(){
    this.setState({tasks: [
      {
        id: '1',
        room: 'EA.007-EA.008, Eiffel',
        operation: 'Cloisonner',
        start: new Date(2018, 11, 4, 8,0),
        end: new Date(2018, 11, 5, 2,0),
        done: false
      },
      {
        id: '2',
        room: 'e.191 - e.192, Bouygues',
        operation: 'Décloisonner',
        start: new Date(2018, 11, 4, 15,0),
        end: new Date(2018, 11, 7, 17,0),
        done: true
      },
      {
        id: '3',
        room: 'sc.007 - sc.013, Bouygues',
        operation: 'Cloisonner',
        start: new Date(2018, 11, 9, 9,0),
        end: new Date(2018, 11, 12, 17,0),
        done: false
      }
    ]})
  }
  
  render() {
    let taskItems;
    if(this.state.tasks){
      taskItems = this.state.tasks.map(task =>{
        return(
          <tbody key={task.id}>
            <TaskItem task={task} />
          </tbody>
        )
      })
    }
    return (
      <div className="Tasks">
          <h3>Tâches à réaliser</h3>
          <table className="table">
            {taskItems}
          </table>
      </div>
    );
  }
}

export default Tasks;
