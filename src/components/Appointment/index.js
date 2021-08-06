import React from 'react';
import Header from 'components/Appointment/header'
import Show from 'components/Appointment/show'
import Empty from 'components/Appointment/empty'
import Form from 'components/Appointment/form'
import 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode'


export default function Appointment(props) {


    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = 'CREATE'
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
      const interviewers = []

    return (
        <article className="Appointment">
            {props.time && <Header time={props.time} />}
            {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} /> }
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form interviewers={props.interviewers}  onCancel={() => back()}/>}
        </article>
    )
}