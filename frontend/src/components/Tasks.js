import React, { Component } from 'react';
import TaskItem from './TaskItem';
import fetchTasks from '../services/fetchTasks';
import updateTask from '../services/updateTask';


require('react-datetime');

class Tasks extends Component {

  constructor() {
    super();
    this.state = { tasks: []}
  }
  
  fetchTasks(){
    fetchTasks()
    .then(tasks => {
      this.setState({tasks});
    }).catch(err=> {console.log("impossible d'afficher les tâches");
                    console.log(err)})
  }

  componentWillMount(){
    this.fetchTasks();
  }

  //function updatebutton
  async handleClick(task, done){
    const body = {done};
    const url = `/tasks/${task._id}`;
    updateTask(url,body)
    .then( () => {
      let tasks = this.state.tasks;
      const i = tasks.indexOf(task);
      tasks[i].done = tasks[i].done ? false : true;
      this.setState(tasks)
    }).catch(err=>{console.log("impossible de modifier la tâche");
                  console.log(err)})
}


  render() {
    let taskItems;
    if(this.state.tasks){
      taskItems = this.state.tasks.map(task =>{
        return(
            <TaskItem key={task._id} task={task} handleClick={(task,done)=>this.handleClick(task,done)} />
        )
      })
    }
    return (
      <div className="Tasks">
          <h3 className="ml-2"> Tâches à réaliser</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Salle</th>
                <th scope="col">Opération</th>
                <th scope="col">Du</th>
                <th scope="col">Au</th>
                <th scope="col">Statut</th>
                <th scope="col">Fait?</th>
              </tr>
            </thead>
            <tbody>
              {taskItems}
            </tbody>
          </table>
      </div>
    );
  }
}

export default Tasks;
