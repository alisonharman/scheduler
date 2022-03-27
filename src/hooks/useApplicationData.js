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
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
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
    const days = updateSpots(appointments)

    const request = axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })

    return request
      .then(() => {
        setState({
          ...state,
          appointments, days
        })
      });
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
    const days = updateSpots(appointments)
   

    const request = axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview: null })

    return request
      .then(result => {
        setState({
          ...state,
          appointments, days
        })
      });
  };

  function updateSpots(appointments) {
    // based on state.day (e.g. "Monday"), find the object representing this day in the state.days array
    // extract day id and appointments (array of ids) of this object
    let dayIndex = 0;
    let appointmentIds = [];
    for (const day of state.days) {
      if (state.day === day.name) {
        dayIndex = day.id-1
        appointmentIds = day.appointments
      }
    }
    // deep copy of day object
    const day = {...state.days[dayIndex]}

    // need to extract the total number of null interview based on appointment ids
    let nullSpots = 0;
    for (const id of appointmentIds) {
      const obj = appointments[id]
      if (obj.interview === null) {
        nullSpots++
      }
    }
    
    day.spots = nullSpots;

    // build a new days array of state object by replacing the day with correct number of spots
    let days = [...state.days];
    days.splice(dayIndex, 1, day)
    return days;
  };
  

  return { state, setDay, bookInterview, cancelInterview }

}