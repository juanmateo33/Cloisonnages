import axios from 'axios';

export default function authenticateUser (username,password){
    axios.post('http://localhost:3000/users/login', {username,password})
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
  }).catch((err)=>console.log(err))

  }

  