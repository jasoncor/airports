import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";
import { describe, it, expect } from "vitest";

describe("Spinner", () => {
  it("renders without crashing", () => {
    const { getByLabelText } = render(<Spinner />);
    expect(getByLabelText("Loading")).toBeInTheDocument();
  });

  it("applies custom props", () => {
    const { getByLabelText } = render(<Spinner data-testid="spinner" />);
    const spinner = getByLabelText("Loading");
    expect(spinner).toHaveAttribute("data-testid", "spinner");
  });

  it("applies the correct classes", () => {
    const { getByLabelText } = render(<Spinner />);
    const spinner = getByLabelText("Loading");
    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveClass("text-red-500");
    expect(spinner).toHaveClass("m-auto");
    expect(spinner).toHaveClass("h-full");
  });

  it("overrides default height and width if provided", () => {
    const { getByLabelText } = render(<Spinner height={50} width={50} />);
    const spinner = getByLabelText("Loading");
    expect(spinner).toHaveAttribute("height", "50");
    expect(spinner).toHaveAttribute("width", "50");
  });
});
