import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";
import Shoes from "./Shoes";

describe("Shoes", () => {
  let updateSize, addShoe, removeShoe;

  beforeEach(() => {
    updateSize = vi.fn();
    addShoe = vi.fn();
    removeShoe = vi.fn();
  });

  it("should render an add shoe button", () => {
    render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={[]}
      />
    );
    const addButton = screen.getByRole("button", { name: "+" });
    expect(addButton).toBeInTheDocument();
  });

  it("should render shoe size input when add button is clicked", async () => {
    const { rerender } = render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={[]}
      />
    );
    const addButton = screen.getByRole("button", { name: "+" });

    await userEvent.click(addButton);
    rerender(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={[{ id: "1", size: "" }]}
      />
    );

    const shoeSizeInput = screen.getByRole("textbox");
    expect(addShoe).toHaveBeenCalled();
    expect(shoeSizeInput).toBeInTheDocument();
  });

  it("should update shoe size", async () => {
    render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={[{ id: "1", size: "40" }]}
      />
    );
    const shoeSizeInput = screen.getByRole("textbox");

    await userEvent.type(shoeSizeInput, "43");

    expect(updateSize).toHaveBeenCalledTimes(2);
    expect(shoeSizeInput).toHaveValue("43");
  });

  it("should remove shoe size input when remove button is clicked", async () => {
    const shoes = [{ id: "1", size: "40" }];

    const { rerender } = render(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );
    const shoeSizeInput = screen.getByRole("textbox");
    const removeShoeButton = screen.getByRole("button", { name: "-" });

    await userEvent.click(removeShoeButton);
    shoes.pop();
    rerender(
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );

    expect(removeShoe).toHaveBeenCalledWith("1");
    expect(shoes).toHaveLength(0);
    expect(shoeSizeInput).not.toBeInTheDocument();
  });
});
