import React from 'react';
import { useState, useEffect } from 'react';
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'




export default function Form(props) {
    useEffect(()=>   console.log(interviewer))


    const [name, setName] = useState(props.name || '')


    const [interviewer, setInterviewer] = useState(props.interviewer || null)

    const [error, setError] = useState("");


    const reset = () => {
        setName('')
        setInterviewer(null)
    }

   const cancel = () => {
       reset()
       props.onCancel()
   }

   const validate = () => {
     if (name === "" || interviewer === null) {
      setError("student name or interviewer cannot be blank");
      return;
     }
     setError("");
     props.onSave(name, interviewer);
   }



    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={name}
              onChange={(event => setName(event.target.value))}
              data-testid ="student-name-input"
              /*
                This must be a controlled component
              */
            />
            <section className="appointment__validation">{error}</section>
          </form>
          <InterviewerList
            interviewers={props.interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={cancel} danger>Cancel</Button>
            <Button onClick={validate} confirm>Save</Button>
          </section>
        </section>
      </main>
    )
}