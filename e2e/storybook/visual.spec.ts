import { expect, test } from "@playwright/test";
import { openStory } from "../support/storybook";

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

const suites = [
  {
    viewports: ["mobile", "tablet", "desktop"] as const,
    stories: [
      "pokemon-pokemoncard--default",
      "pokemon-pokemongrid--default",
      "pokemon-pokemondetailview--default",
      "pokemon-pokedex--default",
    ],
  },
  {
    viewports: ["mobile", "desktop"] as const,
    stories: [
      "ui-button--primary",
      "ui-button--secondary",
      "ui-button--ghost",
      "ui-button--loading",
      "ui-button--disabled",
      "ui-pagination--first-page",
      "ui-pagination--middle-page",
      "ui-pagination--few-pages",
      "ui-pokemontypebadge--all-types",
      "ui-feedbackmessage--error-state",
      "ui-feedbackmessage--empty-state",
      "ui-modal--open",
    ],
  },
];

for (const suite of suites) {
  for (const viewportName of suite.viewports) {
    test.describe(viewportName, () => {
      test.use({ viewport: viewports[viewportName] });

      for (const id of suite.stories) {
        test(`${id} matches the snapshot`, async ({ page }) => {
          await openStory(page, id);
          await page.evaluate(() =>
            Promise.all(
              Array.from(document.images).map((image) =>
                image.decode().catch(() => undefined),
              ),
            ),
          );

          await expect(page).toHaveScreenshot(`${id}-${viewportName}.png`, {
            fullPage: true,
            animations: "disabled",
          });
        });
      }
    });
  }
}
