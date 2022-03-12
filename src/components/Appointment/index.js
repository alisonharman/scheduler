import React, { Fragment } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

export default function Appointment(props) {

  function save(name, interviewer) {
    //console.log('INTERVIEWER', interviewer[0].id);
    transition(SAVING)
    const interview = {
      student: name,
      interviewer: interviewer[0].id
    }
  
    setTimeout(() => {
      props.bookInterview(props.id.toString(), interview)
      transition(SHOW)
    }, 1000)

    // below doesn't work to show saving form...
   // props.bookInterview(props.id.toString(), interview)
   // .finally(transition(SHOW))
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel = {() => back() }
        onSave = {save}
      />)}
      {mode === SAVING && <Status message="Saving..."/>}
    </Fragment>
  )
}