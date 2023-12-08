import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { getAllInputs } from "../components/BookingInfo/BookingInfo.test";
import Booking from "./Booking";
import Confirmation from "./Confirmation";

export const fillBookingForm = async () => {
  const bookButton = screen.getByRole("button", { name: "strIIIIIike!" });
  const { date, time, people, lanes } = getAllInputs();
  await userEvent.type(date, "2024-01-06");
  await userEvent.type(time, "13:00");
  await userEvent.type(people, "2");
  await userEvent.type(lanes, "1");
  const addShoeButton = screen.getByRole("button", { name: "+" });

  await userEvent.click(addShoeButton);
  await userEvent.click(addShoeButton);

  const shoeSizeInputs = screen.getAllByTestId("shoe");

  for (const shoeSizeInput of shoeSizeInputs) {
    await userEvent.type(shoeSizeInput, "43");
  }

  await userEvent.click(bookButton);
};

describe("Booking", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );
  });

  it("should render booking button", () => {
    const bookButton = screen.getByRole("button", { name: "strIIIIIike!" });
    expect(bookButton).toBeInTheDocument();
  });

  it("should show error message when fields are empty", async () => {
    const bookButton = screen.getByRole("button", { name: "strIIIIIike!" });
    await userEvent.click(bookButton);

    expect(
      screen.getByText(
        "Fill out all the fields and make sure that people and shoes is the same number."
      )
    ).toBeInTheDocument();
  });

  it("should show error message when the number of shoes is not equal to the number of people", async () => {
    const { date, time, people, lanes } = getAllInputs();
    const bookButton = screen.getByRole("button", { name: "strIIIIIike!" });

    await userEvent.type(date, "2025-11-01");
    await userEvent.type(time, "14:30");
    await userEvent.type(people, "2");
    await userEvent.type(lanes, "1");
    await userEvent.click(bookButton);

    expect(
      screen.getByText(
        "Fill out all the fields and make sure that people and shoes is the same number."
      )
    ).toBeInTheDocument();
  });

  it("should navigate to confirmation page, generate unique booking number and a total price when the form is filled out correctly and the booking button is clicked", async () => {
    await fillBookingForm();

    const bookingNumberLabel = screen.getByText("Booking number");
    const bookingNumberInput =
      bookingNumberLabel.parentElement.querySelector('input[type="text"]');

    expect(bookingNumberInput).toBeInTheDocument();

    const bookingNumber = bookingNumberInput.value;
    expect(bookingNumber).toBe("STR4897YTH1337");

    expect(screen.getByText(/See you soon!/i)).toBeInTheDocument();

    const totalPrice = Number(
      screen.getByText(/sek/i).textContent.split(" ")[0]
    );

    const expectedTotalPrice = 120 * 2 + 100 * 1;
    expect(totalPrice).toBe(expectedTotalPrice);
  });
});
