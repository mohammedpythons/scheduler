import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";
import axios from "axios";

afterEach(cleanup);

describe("integration test", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(res => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  })


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));

    expect(getByText(appointment,"SAVING!")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    console.log(prettyDOM(day));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

    fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "ARE YOU SURE YOU WANT TO DELETE?")).toBeInTheDocument()
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"))
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "DELETING!")).toBeInTheDocument()
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();



  debug();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {



      // We want to start by finding an existing interview.
      const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

      fireEvent.click(getByAltText(appointment, "Edit"));

      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });

      fireEvent.click(getByText(appointment,"Save"))

      expect(getByText(appointment, "SAVING!")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    debug()
  })



  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);


    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment,"SAVING!")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Could not save the appointment!"));

    expect(getByText(appointment, "Could not save the appointment!")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

      fireEvent.click(getByAltText(appointment, "Delete"));


      expect(getByText(appointment,"ARE YOU SURE YOU WANT TO DELETE?")).toBeInTheDocument()

      fireEvent.click(getByText(appointment, "Confirm"))

      expect(getByText(appointment,"DELETING!")).toBeInTheDocument()

      await waitForElement(() => getByText(appointment, "Could not delete the appointment!"));

      expect(getByText(appointment, "Could not delete the appointment!")).toBeInTheDocument();



  })


});