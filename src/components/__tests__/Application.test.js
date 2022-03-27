import React from "react";
import Application from "components/Application";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
//import '@testing-library/jest-dom';
import axios from 'axios'
//jest.mock('../../__mocks__/axios')

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"))
  .then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
