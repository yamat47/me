import type { Article, Language } from "@yamat47/pylon";
import type { PageName } from "../routes.ts";
import { AboutPage } from "./AboutPage.tsx";
import { CareerPage } from "./CareerPage.tsx";
import { ProjectsPage } from "./ProjectsPage.tsx";
import { TalksPage } from "./TalksPage.tsx";
import { TopPage } from "./TopPage.tsx";
import { WritingPage } from "./WritingPage.tsx";

type ViewProps = {
  lang: Language;
  page: PageName;
  // Everything written, newest first, for the pages that list it.
  articles: readonly Article[];
};

/** One of the site's pages, in one language. */
export function View({ lang, page, articles }: ViewProps) {
  switch (page) {
    case "top":
      return <TopPage lang={lang} articles={articles} />;
    case "about":
      return <AboutPage lang={lang} />;
    case "projects":
      return <ProjectsPage lang={lang} />;
    case "talks":
      return <TalksPage lang={lang} />;
    case "writing":
      return <WritingPage lang={lang} articles={articles} />;
    case "career":
      return <CareerPage lang={lang} />;
  }
}
