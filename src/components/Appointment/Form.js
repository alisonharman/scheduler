import React, {useState} from "react";
import "./styles.scss"
import Button from "../Button"
import InterviewerList from "../InterviewList"

export default function Form(props) {

  const [word, setWord] = useState("");

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={word}
            onChange={(event) => setWord(event.target.value)}
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={props.interviewer}
        /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button confirm  onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
};