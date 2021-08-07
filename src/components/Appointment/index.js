import React from 'react';
import Header from './header'
import Show from './show'
import Empty from './empty'
import Form from './form'
import Status from './status'
import Confirm from './confirm'
import Error from "./error"
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
    const ERROR_SAVE = 'ERROR_SAVE';
    const ERROR_DELETE = 'ERROR_DELETE';

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
        .catch(() => transition(ERROR_SAVE, true))
      };



    function Deleting() {

        transition(DELETING)
        props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true))


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
            {mode === CONFIRM && <Confirm message="ARE YOU SURE YOU WANT TO DELETE?" onConfirm={Deleting} onCancel={() => back()} />}
            {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save}  onCancel={() => back()}/>}
            {mode === ERROR_SAVE && <Error message="Could not save the appointment!" onClose={()=> back()} />}
            {mode === ERROR_DELETE && <Error message="Could not delete the appointment!" onClose={()=> back()} />}

        </article>
    )
}