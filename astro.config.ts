import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { SITE } from "./src/site.ts";

export default defineConfig({
  site: SITE.url,

  // The pages are made of the design system's components (@yamat47/pylon), which are React. None
  // is hydrated: they are rendered to HTML when the site is built, and no page ships React. The
  // integration still writes its script for the browser into the build (dist/_astro/client.*.js),
  // which no page loads.
  integrations: [react()],

  // Every page is a directory with an index.html, which GitHub Pages serves at the path with a
  // slash (/about/). Links are written with the slash, so that none goes through a redirect.
  trailingSlash: "always",
});
