import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),
  // Handles a GET /user request
  rest.get('/api/days', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        errorMessage: fixtures.days,
      }),
    )
  }),
  rest.get('/api/appointments', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fixtures.appointments,
      }),
    )
  }),
  rest.get('/api/interviewers', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fixtures.interviwers,
      }),
    )
  }),
]

const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};
