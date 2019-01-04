import axios from 'axios';
 
 async function fetchRooms() {
    return axios.get('/rooms')
    // on retourne la promesse et pas seulement la valeur pour pouvoir ajouter un then à cette promesse
  }

export default fetchRooms;