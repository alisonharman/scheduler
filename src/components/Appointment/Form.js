import React, { useState } from "react";
import "./styles.scss"
import Button from "../Button"
import InterviewerList from "../InterviewList"

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");

  function reset() {
    setStudent("")
    setInterviewer(null)
    setError("")
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  function validate() {
    // remove with white space for testing: do not want a blank space as a name even if it does not cause an error
    let name = student.replace(/\s+/g, "");
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer == null) {
      setError("Please choose an interviewer");
      return;
    }
    setError("");
    return true;
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
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => {
            if (validate()) {
              props.onSave(student, interviewer);
            }
          }
          }>Save</Button>
        </section>
      </section>
    </main>
  )
};