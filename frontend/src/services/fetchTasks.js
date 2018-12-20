import axios from 'axios';

export default async function fetchTasks() {
    axios.get('/tasks')
    .then(res => {
      const tasks= res.data.sort(((a, b) => new Date(a.end)-new Date(b.end)));
      return tasks;
    }).catch(err=> {console.log("impossible de récupérer les tâches");
                    console.log(err)})
  }

