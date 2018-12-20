import React from 'react';


function TaskItem(props) { //à travers props, TaskItem hérite de task et de handleclick
    const beginning = props.task.beginning;
    const myBeginning = new Date(beginning);
    const end = props.task.end;
    const myEnd = new Date(end);
    const now= new Date();
    const duration = myEnd-now;

    //function créant un boutton done 
    function renderButton() {

      if (props.task.done && duration>0){ //si c'est fait
        return <td> <button type="button" className="btn btn-outline-dark btn-sm"  onClick={()=>props.handleClick(props.task,false)}> c'est à faire</button></td>
      } else if (props.task.done && duration<=0) { // si c'est fait et c'est passé
        return 
      } else if (!props.task.done && duration<0) { // si c'est à faire et c'est passé
        return 
      } else if (!props.task.done && duration/60000>120 ) { // si c'est à faire mais il y a le temps
        return <td> <button type="button" className="btn btn-outline-dark btn-sm"  onClick={()=>props.handleClick(props.task,true)}> c'est fait</button></td>
      } else { // si c'est à faire urgemment
        return <td> <button type="button" className="btn btn-outline-dark btn-sm"  onClick={()=>props.handleClick(props.task,true)}> c'est fait</button></td>
      }
      
    }
    
    //function pour montrer l'état de la tâche avec des couleurs différentes selon l'urgence 
    function renderDone() {

      if (props.task.done && duration>0){ //si c'est fait
        return <td className="text-success">fait</td>
      } else if (props.task.done && duration<=0) { // si c'est fait et c'est passé
        return <td className="text-muted">fait</td>
      } else if (!props.task.done && duration<0) { // si c'est à faire et c'est passé
        return <td className="text-muted">raté</td>
      } else if (!props.task.done && duration/60000>120 ) { // si c'est à faire mais il y a le temps
        return <td className="text-warning">à faire </td>
      } else { // si c'est à faire urgemment
        return <td className="text-danger">à faire d'ici {Math.trunc(duration/60000)} min</td>
      }
    }

    //affiche la tâche sous forme de ligne du tableau
    return (
      <tr className="Task">
        <td className="room">{props.task.room}</td>
        <td className="operation">{props.task.operation}</td>
        <td className="beginning">{myBeginning.toString().substring(0,21)}</td>
        <td className="end">{myEnd.toString().substring(0,21)}</td>
        {renderDone()}
        {renderButton()}
      </tr>
    );
}


export default TaskItem;
