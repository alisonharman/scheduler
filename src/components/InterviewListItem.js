import React from "react";
import classNames from '../../node_modules/classnames';
import "components/InterviewListItem.scss";

export default function InterviewListItem(props) {

  let interviewClass = classNames('interviewers__item ', {'interviewers__item--selected': props.selected})

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )

}

