import axios from 'axios';


async function fetchNextTasks() {
    const since = (new Date()).toISOString();
    return axios.get('/tasks?since='+since, {headers: { "Authorization": localStorage.getItem('token') }})
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
  }

export default fetchNextTasks;

 

