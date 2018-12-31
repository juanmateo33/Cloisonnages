import { Component } from 'react';


class Logout extends Component {

  componentWillMount(){
    localStorage.clear();
    this.props.history.push('./login')
  }
  render() {
    return null
  }
}

export default Logout;
