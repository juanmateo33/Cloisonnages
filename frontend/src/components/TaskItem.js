import React from 'react';


function TaskItem(props) {
    const beginning = props.task.beginning;
    var myBeginning = new Date(beginning);
    const end = props.task.end;
    var myEnd = new Date(end);
    
    //function pour montrer l'état de la tâche avec des couleurs différentes selon l'urgence 
    function renderDone() {
      const now = new Date();
      const duration = myEnd-now;
      console.log(duration/60000)
      if (props.task.done && duration>0){ //si c'est fait
        return <td className="text-success">done</td>
      } else if (props.task.done && duration<=0) { // si c'est fait et c'est passé
        return <td className=".text-muted">done</td>
      } else if (!props.task.done && duration<0) { // si c'est à faire et c'est passé
        return <td className=".text-muted">missed</td>
      } else if (!props.task.done && duration/60000>120 ) { // si c'est à faire mais il y a le temps
        return <td className="text-warning">pending </td>
      } else { // si c'est à faire urgemment
        return <td className="text-danger">pending in {Math.trunc(duration/60000)} min</td>
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
      </tr>
    );
}


export default TaskItem;
