import React, { Component } from 'react';

class About extends Component {
  constructor(){
    super();
    this.state = {
      tasks: []
    }
  }

  render() {
    return (
      <div className="About">
          THIS IS ABOUT
      </div>
    );
  }
}

export default About;
