import React, { Component } from 'react';
import TaskItem from './components/TaskItem';
import fetchNextTasks from '../../services/fetchTasks/fetchNextTasks';
import fetchAllTasks from '../../services/fetchTasks/fetchAllTasks';

import updateTask from '../../services/updateTask';
import DateNavBar from './components/DateNavBar';



require('react-datetime');

class Tasks extends Component {

  constructor() {
    super();
    this.state = { tasks_shown: [], tasks:[], history: false};
    this.onClickShowAll = this.onClickShowAll.bind(this);
    this.onClickShowMonth = this.onClickShowMonth.bind(this);
    this.onClickShowWeek = this.onClickShowWeek.bind(this);
    this.onClickShowQuarter = this.onClickShowQuarter.bind(this);
    this.handleError = this.handleError.bind(this);

  }

  handleError(err){
    if (err.response.status===401) {
    console.log("vous n'êtes plus authentifié"+err.response.status);
    this.props.history.push('./logout');
  }}
  
  fetchNextTasks(until){
    return fetchNextTasks(until)
    .then(tasksfetched => {
       const tasks = tasksfetched.data.sort(((a, b) => new Date(a.end)-new Date(b.end)));
       return tasks
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                    this.handleError(err);
                  })
  }

  fetchAllTasks(){
    fetchAllTasks()
    .then(tasksfetched => {
      const tasks = tasksfetched.data.sort(((a, b) => new Date(a.end)-new Date(b.end)));
      this.setState({tasks});
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                  this.handleError(err);
                  })
  }



  onClickShowAll(){
    this.fetchAllTasks();
  }

  onClickShowPeriod(date){
    this.fetchNextTasks(date).then(tasks=>this.setState({tasks}))
  }

  onClickShowMonth(){
    let date = new Date();
    //next month
    date.setMonth(date.getMonth() + 1);
    this.onClickShowPeriod(date);
  }

  onClickShowQuarter(){
    let date = new Date();
    //next quarter
    date.setMonth(date.getMonth() + 3);
    this.onClickShowPeriod(date);
  }

  onClickShowWeek(){
    const now = new Date();
    const date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    //next week
    this.onClickShowPeriod(date);
  }


  componentWillMount(){
    this.onClickShowQuarter()
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
      this.setState({tasks});
    }).catch(err=>{console.log("impossible de modifier la tâche");
                  this.handleError(err);
  })
}


  render() {
    let taskItems;
    if(this.state.tasks_shown){
      taskItems = this.state.tasks.map(task =>{
        return(
            <TaskItem key={task._id} task={task} handleClick={(task,done)=>this.handleClick(task,done)} />
        )
      })
    }
    return (
      <div className="Tasks">
          <h3 className="ml-2"> Tâches à réaliser</h3>
          <DateNavBar history={this.state.history} onClickShowAll={this.onClickShowAll} onClickShowMonth={this.onClickShowMonth} onClickShowWeek={this.onClickShowWeek} onClickShowQuarter={this.onClickShowQuarter}/>
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
