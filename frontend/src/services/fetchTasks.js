import axios from 'axios';


export default async function fetchTasks() {
    return axios.get('/tasks', {headers: { "Authorization": localStorage.getItem('token') }})
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
    .then((res) => {
      const tasks= res.data.sort(((a, b) => new Date(a.end)-new Date(b.end)));
      return tasks;
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                    console.log(err)})
  }

