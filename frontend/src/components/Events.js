import React, {Component} from 'react';
import fetchEvents from '../services/fetchEvents';

class Events extends Component {

    constructor() {
        super();
        this.state = {ressources: ''}
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        fetchEvents()
        .then((res)=>{
            const ressources = res.data
            this.setState({ressources});
        })
        .catch((err)=>console.log(err))
    }

    render() {
        const events = this.state.ressources
        return(
      <div className="Events">
      <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={this.handleClick}> Montrer les ressources </button>
      <div>  {events} </div>
      </div>)
    }
}


export default Events;

