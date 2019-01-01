import axios from 'axios';


async function fetchNextTasks() {
    const since = (new Date()).toISOString();
    return axios.get('/tasks?since='+since, {headers: { "Authorization": localStorage.getItem('token') }})
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
    .then((res) => {
      const tasks= res.data.sort(((a, b) => new Date(a.end)-new Date(b.end)));
      return tasks;
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                    // if err401: this.props.history.push('./logout');
                    console.log(err)})
  }

export default fetchNextTasks;

 

