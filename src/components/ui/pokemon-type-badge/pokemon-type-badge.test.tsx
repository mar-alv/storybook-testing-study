import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PokemonTypeBadge } from "@/components/ui/pokemon-type-badge/pokemon-type-badge";

describe("PokemonTypeBadge", () => {
  it("shows the formatted type name", () => {
    render(<PokemonTypeBadge type="fire" />);
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("falls back to a neutral style for unknown types", () => {
    render(<PokemonTypeBadge type="shadow" />);
    expect(screen.getByText("Shadow")).toHaveClass("bg-slate-200");
  });

  it.each([
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "poison",
    "flying",
    "shadow",
  ])("matches the snapshot for %s", (type) => {
    const { container } = render(<PokemonTypeBadge type={type} />);
    expect(container).toMatchSnapshot();
  });
});
