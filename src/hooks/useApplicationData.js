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
    const days = updateSpots(true)

    const request = axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })

    return request
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments, days
        }))
      });
/*
    // the below leaves an uncatched error?
    return Promise.all([
      Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })),
      Promise.resolve(setState({
        ...state,
        appointments
      }))
    ])
*/
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
    const days = updateSpots()
   

    const request = axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview: null })

    return request
      .then(result => {
        setState({
          ...state,
          appointments, days
        })
      });
  };

  function updateSpots(interviewAdded=false) {
    // need to find the index of days array whose "spots" needs to be updated
    // have day of Week (e.g. "Monday") from state
    let dayIndex = 0;
    for (const day of state.days) {
      if (state.day === day.name) {
        dayIndex = day.id-1
      }
    }
    // deep copy of day object
    const day = {...state.days[dayIndex]}
    
    // if adding an interview like in bookInterview, then number of spots decreases by one
    if (interviewAdded) {
      day.spots -= 1
    }
    else {
      day.spots += 1
    }

    // build a new days array of state object by replacing the day with correct number of spots
    let days = [...state.days];
    days.splice(dayIndex, 1, day)
    return days;
  };
  

  return { state, setDay, bookInterview, cancelInterview }

}