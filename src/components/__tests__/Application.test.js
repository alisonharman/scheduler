import React from "react";
import Application from "components/Application";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
/*
jest.unmock('axios')
import axios from "axios"
const MockAdapter = require("axios-mock-adapter");
import {fixtures} from "../../__mocks__/axios"

beforeAll(() => {
  mock.reset();
});

// This sets the mock adapter on the default instance
let mock = new MockAdapter(axios);

mock.onGet("/api/days").reply(200, {
  data: fixtures.days
});

mock.onGet("/api/appointments").reply(200, {
  data: fixtures.appointments
});

mock.onGet("/api/interviewers").reply(200, {
  data: fixtures.interviewers
});
*/

afterEach(cleanup);

describe("Form", () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);

     return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

});