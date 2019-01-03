import axios from 'axios';
 
 async function fetchEvents() {
    return axios.get('/events')
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
  }

export default fetchEvents;