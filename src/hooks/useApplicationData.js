import { useState, useEffect } from 'react';
import axios from "axios";

export default function useVisualMode(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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

    const request = axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})

    return request
    .then(result => {setState({
      ...state,
      appointments
     }) });

     // the below leaves an uncatched error?
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
/*
     return Promise.all([
      Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview: null})),
      Promise.resolve( setState({
        ...state,
        appointments
       }))
    ])
    */

    const request = axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview: null})

    return request
    .then(result => {setState({
      ...state,
      appointments
     }) });

  };

  return {state, setDay, bookInterview, cancelInterview}

}