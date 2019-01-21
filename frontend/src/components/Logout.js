import { Component } from 'react';


class Logout extends Component {

  componentWillMount(){
    localStorage.clear();
    console.log("onn est passé par logout")
    this.props.history.push('./login')
  }
  render() {
    return null
  }
}

export default Logout;
