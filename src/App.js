import React, { Component } from 'react';
import Tasks from './components/Tasks';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [
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
      ]
    }
  }
  render() {
    return (
      <div className="App">
          <h1>
            Cloisonnage CentraleSupélec
          </h1>
          <Tasks tasks={this.state.tasks}/>
      </div>
    );
  }
}

export default App;
