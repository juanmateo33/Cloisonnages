import axios from 'axios';


export default async function updateTask(url, body) {
    return axios.patch(url, body, {headers: { "Authorization": localStorage.getItem('token') }})
}