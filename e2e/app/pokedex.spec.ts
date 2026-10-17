import { expect, test } from "@playwright/test";
import { pokemonNames } from "@/mocks/fixtures";
import { formatPokemonName } from "@/lib/pokemon-utils";
import { mockPokeApi } from "../support/mock-pokeapi";

test.describe("Pokedex", () => {
  test.beforeEach(async ({ page }) => {
    await mockPokeApi(page);
  });

  test("lists the first page of pokemon", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Pokédex", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /^#\d{3,4} / })).toHaveCount(
      20,
    );
  });

  test("navigates between pages", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Próxima" }).click();

    await expect(
      page.getByRole("button", {
        name: new RegExp(formatPokemonName(pokemonNames[20]), "i"),
      }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /bulbasaur/i })).toHaveCount(
      0,
    );
    await expect(page.getByRole("button", { name: "Próxima" })).toBeDisabled();

    await page.getByRole("button", { name: "Anterior" }).click();
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();
  });

  test("opens the details and returns focus on close", async ({ page }) => {
    await page.goto("/");
    const card = page.getByRole("button", { name: /charizard/i });

    await card.click();

    const dialog = page.getByRole("dialog", { name: "Charizard" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Fire")).toBeVisible();
    await expect(dialog.getByText("Flying")).toBeVisible();
    await expect(dialog.getByRole("progressbar")).toHaveCount(6);

    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
  });

  test("opens the details with the keyboard", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog", { name: "Bulbasaur" })).toBeVisible();
  });

  test("closes the details by clicking the backdrop", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /squirtle/i }).click();
    const dialog = page.getByRole("dialog", { name: "Squirtle" });
    await expect(dialog).toBeVisible();

    await page.mouse.click(2, 2);

    await expect(dialog).toBeHidden();
  });

  test("adapts the layout to the viewport", async ({ page, isMobile }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();

    if (isMobile) {
      await expect(page.getByText("Página 1 de 2")).toBeVisible();
      await expect(page.getByRole("button", { name: "Página 2" })).toBeHidden();
    } else {
      await expect(
        page.getByRole("button", { name: "Página 2" }),
      ).toBeVisible();
      await expect(page.getByText("Página 1 de 2")).toBeHidden();
    }

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

test.describe("Pokedex with API failures", () => {
  test("shows the error and recovers after retrying", async ({ page }) => {
    const api = await mockPokeApi(page);
    api.failList(true);
    await page.goto("/");

    await expect(
      page.getByRole("alert").filter({ hasText: "(500)" }),
    ).toBeVisible();

    api.failList(false);
    await page.getByRole("button", { name: "Tentar novamente" }).click();

    await expect(
      page.getByRole("button", { name: /bulbasaur/i }),
    ).toBeVisible();
  });
});
