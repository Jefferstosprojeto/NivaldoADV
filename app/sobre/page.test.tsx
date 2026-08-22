import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SobrePage from "./page";

describe("SobrePage", () => {
  it("shows the lawyer's name, OAB, and photo", () => {
    render(<SobrePage />);
    expect(screen.getByRole("heading", { name: /dr\. nivaldo/i })).toBeInTheDocument();
    expect(screen.getByText(/OAB\/RJ 93\.663/)).toBeInTheDocument();
    expect(screen.getByAltText(/dr\. nivaldo/i)).toBeInTheDocument();
  });
});
