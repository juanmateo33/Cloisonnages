import React, { Component } from 'react';
import TaskItem from './TaskItem';
import axios from 'axios';

require('react-datetime');

class Tasks extends Component {

  constructor() {
    super();
    this.state = { tasks: []}
  }
///*
  
  fetchTasks(){
    axios.get('/tasks')
    .then(res => {

      const list= res.data.sort((function(a, b) {
        const A = new Date(a.end);
        const B = new Date(b.end);
        return B-A;}));
      this.setState({tasks: list });
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                    console.log(err)})
  }
  componentWillMount(){
    this.fetchTasks();
  }

  //function updatebutton
  handleClick(task, hasBeenDone){
    const body = { done: hasBeenDone};
    const url = `/tasks/${task._id}`;
    axios.patch(url, body)
    .then(//une fois la base de donnée modifiée, on peut la recharger.
      //pour l'instant je n'arrive pas à changer uniquement un élément de la liste de Tasks directement sur le front
      () => this.fetchTasks()
    ).catch(err=> {console.log("impossible de modifier la tâche");
    console.log(err)})
}


  render() {
    let taskItems;
    if(this.state.tasks){
      taskItems = this.state.tasks.map(task =>{
        return(
          <tbody key={task._id}>
            <TaskItem task={task} handleClick={(task,hasBeenDone)=>this.handleClick(task,hasBeenDone)} />
          </tbody>
        )
      })
    }
    return (
      <div className="Tasks">
          <h3 className="ml-2"> Tâches à réaliser</h3>
          <table className="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Salle</th>
                <th scope="col">Opération</th>
                <th scope="col">Du</th>
                <th scope="col">Au</th>
                <th scope="col">Statut</th>
                <th scope="col">Fait?</th>
              </tr>
            </thead>
            {taskItems}
          </table>
      </div>
    );
  }
}

export default Tasks;
