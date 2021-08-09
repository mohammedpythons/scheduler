import React from 'react';
import DayListItem from 'components/DayListItem';
// import Button from  'components/Button';





export default function DayList(props) {




    const dayItems = props.days.map((day) =>  {

        return (
            <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay}
            />
        )
    })



    return <ul>
        {dayItems}
         </ul>
}
