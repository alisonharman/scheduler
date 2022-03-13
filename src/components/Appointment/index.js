import React, { Fragment } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETE = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    }

    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => console.log(error));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteInterview() {

    transition(DELETE)

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => console.log(error));
  }

  return (
    <Fragment >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={() => back()}
        onConfirm={() => deleteInterview()}
      />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />)}
    </Fragment>
  )
}