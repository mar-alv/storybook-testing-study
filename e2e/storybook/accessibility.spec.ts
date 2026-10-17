import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { openStory } from "../support/storybook";

const accessibleStories = [
  "ui-button--primary",
  "ui-pagination--first-page",
  "ui-feedbackmessage--error-state",
  "pokemon-pokemoncard--default",
  "pokemon-pokemongrid--default",
  "pokemon-pokemondetailview--default",
  "pokemon-pokedex--default",
];

const legacyStories = [
  { id: "a11y-legacybutton--default", rules: ["color-contrast"] },
  { id: "a11y-legacypagination--default", rules: ["link-name"] },
  {
    id: "a11y-legacypokemoncard--default",
    rules: ["color-contrast", "image-alt"],
  },
];

async function getViolationIds(page: Parameters<typeof openStory>[0]) {
  const results = await new AxeBuilder({ page })
    .include("#storybook-root")
    .analyze();
  return results.violations.map((violation) => violation.id);
}

test.describe("current components", () => {
  for (const id of accessibleStories) {
    test(`${id} has no violations`, async ({ page }) => {
      await openStory(page, id);
      expect(await getViolationIds(page)).toEqual([]);
    });
  }
});

test.describe("legacy components", () => {
  for (const { id, rules } of legacyStories) {
    test(`${id} reports ${rules.join(", ")}`, async ({ page }) => {
      await openStory(page, id);
      expect(await getViolationIds(page)).toEqual(
        expect.arrayContaining(rules),
      );
    });
  }
});

test.describe("keyboard access", () => {
  test("the current card receives focus", async ({ page }) => {
    await openStory(page, "pokemon-pokemoncard--default");
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(
      "BUTTON",
    );
  });

  test("the legacy card is skipped by Tab", async ({ page }) => {
    await openStory(page, "a11y-legacypokemoncard--default");
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(
      "BODY",
    );
  });
});
