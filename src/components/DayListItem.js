import React from "react";
import classNames from 'classnames';
import 'components/DayListItem.scss';


export default function DayListItem(props) {
    const formatSpots = (formating) => {
        if (formating.spots === 1 ) {
            return '1 spot remaining'
        }
        if (formating.spots === 0) {
            return 'no spots remaining'
        }
        return `${formating.spots} spots remaining`
    }
    let listClass = classNames('day-list__item', {'day-list__item--selected': props.selected}, {'day-list__item--full': props.spots === 0})
  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>

      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}