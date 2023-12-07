import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";
import BookingInfo from "./BookingInfo";

export function getAllInputs() {
  const [people, lanes] = screen.getAllByRole("spinbutton");

  return {
    date: screen.getByText(/date/i).nextSibling,
    time: screen.getByText(/time/i).nextSibling,
    people,
    lanes,
  };
}

describe("BookingInfo", () => {
  beforeEach(() => render(<BookingInfo />));

  const inputTestData = [
    { label: "date", value: "2023-01-16" },
    { label: "time", value: "15:30" },
    { label: "people", value: "4" },
    { label: "lanes", value: "2" },
  ];

  inputTestData.forEach(({ label, value }) => {
    it(`should render ${label} input`, () => {
      const input = getAllInputs()[label];
      expect(input).toBeInTheDocument();
    });

    it(`should update ${label} input`, async () => {
      const input = getAllInputs()[label];
      await userEvent.type(input, value);
      expect(input.value).toBe(value);
    });
  });
});
