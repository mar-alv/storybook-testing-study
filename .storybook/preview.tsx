import type { Preview } from "@storybook/nextjs-vite";
import { artworkHandler } from "@/mocks/handlers";
import { mswLoader } from "./msw";
import "../app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  loaders: [mswLoader],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
    },
    msw: { handlers: { assets: [artworkHandler] } },
  },
};

export default preview;
