import React from 'react';
import Header from 'components/Appointment/header'
import Show from 'components/Appointment/show'
import Empty from 'components/Appointment/empty'
import 'components/Appointment/styles.scss'



export default function Appointment(props) {


    return (
        <article className="Appointment">
            {props.time && <Header time={props.time} />}
            {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student} /> : <Empty onAdd={props.onAdd} />}
        </article>
    )
}