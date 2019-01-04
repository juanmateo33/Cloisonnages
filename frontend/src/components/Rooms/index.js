import React, {Component} from 'react';
import fetchRooms from '../../services/fetchRooms';
import RoomItem from './components/RoomItem';

class Rooms extends Component {

    constructor() {
        super();
        this.state = {ressources: []}
        // this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        fetchRooms()
        .then((res)=>{
            const ressourceslist = Array.from(res.data);
            const ressources = ressourceslist.map(ressource =>{
                return ({NumRes: ressource.NumRes, NomRes: ressource.NomRes})
              })
            this.setState({ressources});
        })
        .catch((err)=>console.log(err))
    }

    render() {
        let rooms;
        if(this.state.ressources){
            rooms = this.state.ressources.map(event =>{
            return(
                <RoomItem key={event.NumRes} event={event} />
            )
        })
        }
        return(
      <div className="Events">
        <h3 className="ml-2">  Salles Modulables</h3>
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">NumRes</th>
                    <th scope="col">NomRes</th>
                </tr>
            </thead>
            <tbody>
                {rooms}
            </tbody>
        </table>
        
      </div>)
    }
}


export default Rooms;

