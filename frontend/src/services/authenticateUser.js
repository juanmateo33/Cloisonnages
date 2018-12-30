import axios from 'axios';

export default function authenticateUser (username_password){ // object
    return axios.post('http://localhost:3000/users/login', username_password)
    .then((resp)=>{
          
      localStorage.clear();
      localStorage.setItem('token', 'Bearer '+resp.data.token);
      // localStorage only store strings : we will parse later
      localStorage.setItem('userInfos', '{ "firstname": "'
      +resp.data.user.firstname+
      '", "lastname": "'
      +resp.data.user.lastname+
      '", "admin": '
      +resp.data.user.admin+
      ', "username": "'
      +resp.data.user.username+
      '"}')
      return resp.data.success
  }).catch((err)=>console.log(err, 'Wrong username or password'))

  }

  