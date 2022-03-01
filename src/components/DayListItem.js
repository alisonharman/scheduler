import React from "react";
import classNames from '../../node_modules/classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item ', { 'day-list__item--selected': props.selected }, {'day-list__item--full': props.spots===0});

  function formatSpots(spots) {
   if (!spots) {
     return "no spots remaining"
   } 
   if (spots === 1) {
     return "1 spot remaining"
   }
   else {
     return `${spots} spots remaining`
   }
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} </h3>
    </li>
  );
}