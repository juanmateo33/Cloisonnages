import React, { Component } from 'react';
import authenticateUser from '../../services/authenticateUser';


class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { username: '', password: '', error: ''};
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    // pour que le this soit bien l'objet login et pas le input
  }

  fillLocalStorage(data){
    localStorage.clear();
      localStorage.setItem('token', 'Bearer '+data.token);
      // localStorage only store strings : we will parse later
      localStorage.setItem('userInfos', '{ "firstname": "'
      +data.user.firstname+
      '", "lastname": "'
      +data.user.lastname+
      '", "admin": '
      +data.user.admin+
      ', "username": "'
      +data.user.username+
      '"}')
  }


  login(e){ 
    e.preventDefault();
    if(this.state.username && this.state.password){
     authenticateUser(this.state.username, this.state.password)
     .then((resp)=>{ 
      if(resp.data.success){
        this.fillLocalStorage(resp.data);
      }

    }).then(()=>{this.props.history.push('./tasks');
      
  }).catch((err)=>
  {console.log(err, 'Wrong username or password');
  this.setState({error:'Le username ou le mot de passe est incorrecte'});  
    })
  
  } else {
    console.log('please enter your username and password');
    this.setState({error:'Veuillez renseignez les champs'})}
}

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  
  

  render(){
    const error = this.state.error;
    return (
      <div className="card bg-light my-auto">
        <div className="card-body">
    
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
      </div>

      <div className="card-footer bg-transparent border-success"> 
        <p className="text-warning">{error}</p>
      </div>
  
    </div>
    )
  }
  

}
export default Login;

   