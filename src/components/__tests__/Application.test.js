import React from "react";
import Application from "components/Application";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText
} from "@testing-library/react";
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
    const { container } = render(<Application/>);

    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))

    // 3. click the "Add" button on the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const addButton = getByAltText(appointment, "Add");
    fireEvent.click(addButton);

  })
});
