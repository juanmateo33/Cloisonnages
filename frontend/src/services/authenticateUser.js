import axios from 'axios';

export default function authenticateUser (username,password){ 
    return axios.post('http://localhost:3000/users/login', {username,password})
}

  