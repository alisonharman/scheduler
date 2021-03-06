export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  // first, need to relate day like "Monday" to id "1", for example
  const findAppointmentsBasedOnDay = (day) => {
    for (const element of state.days) {
      if (element.name === day) {
        return element.appointments
      }
    }
  }
  // assign to local variable
  const appointmentArray = findAppointmentsBasedOnDay(day);
  // appointments array will be the returned value 
  const appointments = [];
  // if no appointments in appointmentArray
  if (!appointmentArray) {
    return appointments;
  }
// iterate through appointments and push each object into a new array
  for (const appointment of appointmentArray) {
    const id = appointment
    for (const property in state.appointments) {
        if (property === id.toString()) {
          appointments.push(state.appointments[property])
        }
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  // if no interview, then return null
  if (!interview) {
    return null;
  }
  // need to return a nested object with keys of student and interviewer
  // get id of interviewer directly from appointment.interview object
  const id = interview.interviewer;
  
  //create nested object
  let object = {
    student: interview.student,
    interviewer: {
      id: id,
      name: state.interviewers[id].name,
      avatar: state.interviewers[id].avatar
    } 
  }
  return object;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers available for that day
  // first, need to relate day like "Monday" to id "1", for example
  const findIDArrayBasedOnDayName = (day) => {
    for (const element of state.days) {
      if (element.name === day) {
        return element.interviewers
      }
    }
  }
  // assign to local variable
  const interviewersArray = findIDArrayBasedOnDayName(day);
  // appointments array will be the returned value 
  const interviews = [];
  // if no appointments in appointmentArray
  if (!interviewersArray) {
    return interviews;
  }
// iterate through appointments and push each object into a new array
  for (const interview of interviewersArray) {
    const id = interview
    for (const property in state.interviewers) {
        if (property === id.toString()) {
          interviews.push(state.interviewers[property])
        }
    }
  }
  return interviews;
}
