import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PokemonCard } from "@/components/pokemon/pokemon-card/pokemon-card";

describe("PokemonCard", () => {
  it("shows the number and the formatted name", () => {
    render(<PokemonCard id={25} name="pikachu" onSelect={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /#025\s*Pikachu/ }),
    ).toBeInTheDocument();
  });

  it("pads single digit ids", () => {
    render(<PokemonCard id={1} name="bulbasaur" onSelect={vi.fn()} />);
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("selects on click", async () => {
    const onSelect = vi.fn();
    render(<PokemonCard id={25} name="pikachu" onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith("pikachu");
  });

  it("selects with the keyboard", async () => {
    const onSelect = vi.fn();
    render(<PokemonCard id={25} name="pikachu" onSelect={onSelect} />);

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    expect(screen.getByRole("button")).toHaveFocus();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["default", 25, "pikachu"],
    ["single digit id", 1, "bulbasaur"],
    ["long name", 1017, "ogerpon-wellspring-mask"],
  ])("matches the snapshot for %s", (_, id, name) => {
    const { container } = render(
      <PokemonCard id={id} name={name} onSelect={vi.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });
});
