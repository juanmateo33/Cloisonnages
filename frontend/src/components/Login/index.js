import React, { Component } from 'react';
import authenticateUser from '../../services/authenticateUser';


class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { username: '', password: ''};
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    // pour que le this soit bien l'objet login et pas le input
  }


  login(e){ 
    e.preventDefault();
    if(this.state.username && this.state.password){
     authenticateUser(this.state).then((success)=>{
      if(success){
        // this.props.checkAuthentification();
        this.props.history.push('./tasks')
      }
    });
  } else {console.log('please enter your username and password')}
}

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  
  

  render(){
    return (
      <form onSubmit={this.login}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">UserName</label>
          <div className="col-sm-10">
            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.onChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.onChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </div>
    </form>
    )
  }
  

}
export default Login;

   