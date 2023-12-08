import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { fillBookingForm } from "./Booking.test";
import Booking from "./Booking";
import Confirmation from "./Confirmation";

describe("Confirmation", () => {
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

  it("should be able to navigate between booking page and confirmation page", async () => {
    await fillBookingForm();
    expect(screen.getByText(/See you soon!/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("navigation"));
    await userEvent.click(
      screen.getByRole("link", {
        name: /booking/i,
      })
    );
    expect(screen.getByText(/WHEN, WHAT & WHO/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("navigation"));
    await userEvent.click(
      screen.getByRole("link", {
        name: /confirmation/i,
      })
    );
    expect(screen.getByText(/See you soon!/i)).toBeInTheDocument();
  });
});
