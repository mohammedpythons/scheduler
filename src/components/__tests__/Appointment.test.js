import React from 'react';
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";
import Appointment from "../Appointment/index"


describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  });