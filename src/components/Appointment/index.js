import React from 'react';
import Header from 'components/Appointment/header'
import Show from 'components/Appointment/show'
import Empty from 'components/Appointment/empty'
import Form from 'components/Appointment/form'
import Status from 'components/Appointment/status'
import Confirm from './confirm'
import 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode'


export default function Appointment(props) {
    // console.log("this is the appointment props",props.interview.student)


    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = 'CREATE';
    const SAVING = 'SAVING';
    const DELETING = 'DELETING';
    const CONFIRM = 'CONFIRM';
    const EDIT = "EDIT";
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );


      function save(name, interviewer) {

        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        props.bookInterview(props.id, interview)// {student: "Archie Cohen", interviewer: {…}}
        .then(() => transition(SHOW))
      };



    function Deleting() {

        transition(DELETING)
        props.cancelInterview(props.id)
        .then(() => transition(EMPTY))

      }




console.log("this is mode",mode)



    return (
        <article className="Appointment">
            {props.time && <Header time={props.time} />}
            {mode === SHOW  && <Show  onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)} interviewer={props.interview.interviewer} student={props.interview.student} /> }
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form interviewers={props.interviewers} onSave={save}  onCancel={() => back()}/>}
            {mode === SAVING && <Status message={'SAVING!'} />}
            {mode === DELETING && <Status message={'DELETING!'} />}
            {mode === CONFIRM && <Confirm message="ARE YOU SURE YOU WANT TO DELETE?" onConfirm={Deleting} onCancel={() => transition(SHOW)} />}
            {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save}  onCancel={() => back()}/>}

        </article>
    )
}