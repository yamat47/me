import type { Article, Language } from "@yamat47/pylon";
import { PageHeader, WritingList } from "@yamat47/pylon";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

type WritingPageProps = {
  lang: Language;
  // Everything written, newest first.
  articles: readonly Article[];
};

/** The page of writing: every article under its year. */
export function WritingPage({ lang, articles }: WritingPageProps) {
  return (
    <Frame lang={lang} page="writing">
      <PageHeader title={TEXT[lang].titles.writing} count={articles.length} />
      <WritingList articles={articles} grouped />
    </Frame>
  );
}
