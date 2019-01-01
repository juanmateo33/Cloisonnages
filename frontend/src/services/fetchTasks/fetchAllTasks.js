 import axios from 'axios';
 
 async function fetchAllTasks() {
    return axios.get('/tasks', {headers: { "Authorization": localStorage.getItem('token') }})
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
  }

export default fetchAllTasks;