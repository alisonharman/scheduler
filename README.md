# Interview Scheduler

Scheduler is a Create React app which allows a student to book, edit, and delete interview appointments with mentors. In this single-page application, appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Screenshots

!["Screenshot of main page on desktop screen"](https://github.com/alisonharman/scheduler/blob/master/docs/Scheduler_desktop.png)


## Getting Started
1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command from the root directory in a terminal window.
3. Run the webpack development server using `npm run start` command from the root directory of the project. The app will be served at <http://localhost:8000/>.

## Setting up API server
1. Fork and clone [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory.
2. Follow the README.md instructions.  This will involve a few steps including:
  - installing dependencies
  - creating the database
  - creating a `.env.development` file in the root directory
  - seeding the database
3. Run the api server using 'npm run start' command for normal operation. The api server will be served at <http://localhost:8001/>.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

```sh
- Node v12.22.7
- axios 0.26.0
- react 16.9.0
- classNames 2.2.6
```