import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import InventorySimulator from "./InventorySimulator";

describe("InventorySimulator", () => {
  it("shows the extrajudicial estimate when there's no will and heirs agree", async () => {
    const user = userEvent.setup();
    render(<InventorySimulator />);

    // Questions render in order: hasAssets, hasWill, heirsAgree,
    // hasMinorOrIncapableHeirs, isPartitionEqual, hasDebts — each with its
    // own "Sim"/"Não" button pair, so index N corresponds to question N.
    const simButtons = screen.getAllByRole("button", { name: /^sim$/i });
    const naoButtons = screen.getAllByRole("button", { name: /^n[ãa]o$/i });

    await user.click(simButtons[0]); // Há bens a inventariar? -> Sim
    await user.click(naoButtons[1]); // Há testamento? -> Não
    await user.click(simButtons[2]); // Herdeiros concordam? -> Sim
    await user.click(naoButtons[3]); // Herdeiro menor/incapaz? -> Não
    await user.click(simButtons[4]); // Partilha igualitária? -> Sim
    await user.click(naoButtons[5]); // Dívidas do espólio? -> Não

    expect(screen.getByText((content, element) => (element?.className.includes('font-serif') && /inventário extrajudicial/i.test(content)) || false)).toBeInTheDocument();
    expect(screen.getByText(/não substitui uma consulta jurídica/i)).toBeInTheDocument();
  });

  it("always shows the legal disclaimer", () => {
    render(<InventorySimulator />);
    expect(screen.getByText(/não substitui uma consulta jurídica/i)).toBeInTheDocument();
  });
});
