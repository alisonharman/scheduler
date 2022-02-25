import React from "react";
import classNames from "../../node_modules/classnames";
//import classNames from classnames;  // does not work.... why?

import "components/Button.scss";

export default function Button(props) {
   
   let buttonClass = classNames('button ', { 'button--confirm': props.confirm }, {'button--danger': props.danger});

   return <button onClick={props.onClick} disabled={props.disabled} className={buttonClass}>{props.children}</button>;
}
