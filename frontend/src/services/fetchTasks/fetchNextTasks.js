import axios from 'axios';


async function fetchNextTasks(until) {
    const Since = (new Date()).toISOString();
    const Until = until.toISOString();
    return axios.get('/tasks?since='+Since+'&until='+Until, {headers: { "Authorization": localStorage.getItem('token') }})
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
  }

export default fetchNextTasks;

 

