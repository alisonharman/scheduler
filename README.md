# Interview Scheduler

Interview Schedule is a Create React app which allows a student to create, edit, and delete interview appointments with mentors. It calls the scheduler-api to edit, create and delete appointments and is available [here](https://github.com/lighthouse-labs/scheduler-api).


## Screenshots

!["Screenshot of main page on desktop screen"](https://github.com/alisonharman/scheduler/blob/master/docs/Scheduler_desktop.png)


## Getting Started
```sh
1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command from the root directory in a terminal window.
3. Run the webpack development server using `npm run start` command from the root directory of the project. The app will be served at <http://localhost:8000/>.
```

## Setting up API server
```sh
1. Fork and clone [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory.
2. Follow the README.md instructions.  This will involve a few steps including:
  -- installing dependencies
  -- creating the database
  -- creating a `.env.development` file in the root directory
  -- seeding the database
3. Run the api server using 'npm run start' command for normal operation. The api server will be served at <http://localhost:8001/>.
```

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
- Node v10.16.1
- Create React App
```