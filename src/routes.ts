// The site's pages and their addresses: English at the root, Japanese under /ja/.
import type { Language } from "@yamat47/pylon";

export const LANGUAGES = ["en", "ja"] as const satisfies readonly Language[];

export const PAGES = ["top", "about", "projects", "talks", "writing", "career", "privacy"] as const;
export type PageName = (typeof PAGES)[number];

// The pages with a title of their own: every page but the top one, which is titled by the name.
export type TitledPage = Exclude<PageName, "top">;

// The pages a reader moves between: every titled page but the privacy policy, which only the
// footer links to.
export const LISTED_PAGES = PAGES.filter((page) => page !== "top" && page !== "privacy");
export type ListedPage = Exclude<TitledPage, "privacy">;

// A page's path. It ends with a slash, as the page is served (astro.config.ts).
export function pathOf(lang: Language, page: PageName): string {
  const base = lang === "en" ? "/" : "/ja/";
  return page === "top" ? base : `${base}${page}/`;
}

export function otherLanguage(lang: Language): Language {
  return lang === "en" ? "ja" : "en";
}
