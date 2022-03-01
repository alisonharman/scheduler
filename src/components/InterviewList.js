import React from 'react';
import InterviewListItem from './InterviewListItem';
import "components/InterviewList.scss";

export default function InterviewList(props) {


  const InterviewListArray = props.interviewers.map(interviewer => {
    return (
      <InterviewListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar}  selected={props.interviewer === interviewer.id} setInterviewer={(event) => props.setInterviewer(interviewer.id)}/>
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewListArray}
      </ul>
    </section>
  )
}