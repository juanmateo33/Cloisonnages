import React from 'react';


function DateNavBar(props) {


    return (
        <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowAll}> Montrer l'historique </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowQuarter}> Trimestre </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowMonth}> Mois </button>
        <button type="button" className="btn btn-outline-secondary btn-sm"  onClick={props.onClickShowWeek}> Semaine </button>

        </div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active">
                <input type="radio" name="periods" id="Trimestre" autoComplete="off" checked={true} readOnly onClick={props.onClickShowQuarter}/> Trimestre
            </label>
            <label className="btn btn-secondary">
                <input type="radio" name="periods" id="Mois" autoComplete="off" readOnly onClick={props.onClickShowMonth}/> Mois
            </label>
            <label className="btn btn-secondary">
                <input type="radio" name="periods" id="Semaine" autoComplete="off" readOnly onClick={props.onClickShowWeek}/> Semaine
            </label>
        </div>
        </div>
    )
}
export default DateNavBar;