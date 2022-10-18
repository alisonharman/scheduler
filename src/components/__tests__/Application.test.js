import React from "react";
import Application from "components/Application";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";
import "../../__mocks__/axios";

//import '@testing-library/jest-dom';
import axios from "axios";
//jest.mock('../../__mocks__/axios')

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("render the Application without crashing, loads data, books an interview", async () => {
    const { container } = render(<Application />);

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Add" button on the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const addButton = getByAltText(appointment, "Add");
    fireEvent.click(addButton);

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    const inputField = getByPlaceholderText(appointment, /enter student name/i);
    fireEvent.change(inputField, {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    const interviewer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewer);

    // 6. Click the "Save" button on that same appointment.
   
  });
});
