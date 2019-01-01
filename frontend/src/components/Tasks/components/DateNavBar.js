import React from 'react';


function DateNavBar(props) {

    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowAll}> Montrer l'historique </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowQuarter}> Trimestre </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowMonth}> Mois </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowWeek}> Semaine </button>

        </div>
    )
}
export default DateNavBar;