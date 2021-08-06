import React from 'react';
import Header from 'components/Appointment/header'
import Show from 'components/Appointment/show'
import Empty from 'components/Appointment/empty'
import Form from 'components/Appointment/form'
import Status from 'components/Appointment/status'
import 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode'


export default function Appointment(props) {


    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = 'CREATE'
    const SAVING = 'SAVING'
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
    //   const interviewers = []


      function save(name, interviewer) {

        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        props.bookInterview(props.id, interview)// {student: "Archie Cohen", interviewer: {…}}
        .then(() => transition(SHOW))
      };



    return (
        <article className="Appointment">
            {props.time && <Header time={props.time} />}
            {mode === SHOW  && <Show interviewer={props.interview.interviewer} student={props.interview.student} /> }
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form interviewers={props.interviewers} onSave={save}  onCancel={() => back()}/>}
            {mode === SAVING && <Status message={'SAVING!'} />}
        </article>
    )
}