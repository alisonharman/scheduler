import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  let dailyAppointments = [];
  let dailyInterviewers = [];

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("api/days")),
      Promise.resolve(axios.get("api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})),
      Promise.resolve( setState({
        ...state,
        appointments
       }))
    ])
  };

  function cancelInterview(id) {
    // need to set interview object to null based on appointment ID
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
     })

     return Promise.all([
      Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview: null})),
      Promise.resolve( setState({
        ...state,
        appointments
       }))
    ])
  };

  // transform appointment data into an array 
  dailyAppointments = getAppointmentsForDay(state, state.day);
  // transform interviewers data into an array
  dailyInterviewers = getInterviewersForDay(state, state.day)
  // turn appointments object into array of appointment objects
  const allAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
