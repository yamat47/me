import type { Article, Language } from "@yamat47/pylon";
import {
  CareerList,
  Introduction,
  LinkList,
  ProjectGrid,
  Prose,
  Section,
  TalkFeature,
  TalkList,
  WritingList,
} from "@yamat47/pylon";
import { COMPANIES } from "../content/career.ts";
import { projectsIn } from "../content/projects.ts";
import { newestSlide, talksIn } from "../content/talks.ts";
import { contactLinks, TEXT } from "../content/text.ts";
import { pathOf } from "../routes.ts";
import { Frame } from "./Frame.tsx";

type TopPageProps = {
  lang: Language;
  // Everything written, newest first.
  articles: readonly Article[];
};

// How many of each list the top page shows before it sends the reader to the list's own page.
const SHOWN = { projects: 4, talksAfterNewest: 2, articles: 5 } as const;

/** The top page: the introduction, then a few of each list under its heading, then contact. */
export function TopPage({ lang, articles }: TopPageProps) {
  const text = TEXT[lang];
  const projects = projectsIn(lang);
  const [newestTalk, ...earlierTalks] = talksIn(lang);
  const talkCount = earlierTalks.length + 1;

  return (
    <Frame lang={lang} page="top">
      <Introduction lang={lang} more={{ label: text.top.aboutMore, href: pathOf(lang, "about") }}>
        {text.top.introduction}
      </Introduction>
      <Section
        title={text.titles.projects}
        more={{ label: text.top.projectsMore(projects.length), href: pathOf(lang, "projects") }}
      >
        <ProjectGrid projects={projects.slice(0, SHOWN.projects)} titleAs="h3" />
      </Section>
      <Section
        title={text.titles.talks}
        more={{ label: text.top.talksMore(talkCount), href: pathOf(lang, "talks") }}
      >
        <TalkFeature talk={newestTalk} slide={newestSlide(lang)} titleAs="h3" />
        <TalkList talks={earlierTalks.slice(0, SHOWN.talksAfterNewest)} titleAs="h3" />
      </Section>
      <Section
        title={text.titles.writing}
        more={{ label: text.top.writingMore(articles.length), href: pathOf(lang, "writing") }}
      >
        <WritingList articles={articles.slice(0, SHOWN.articles)} />
      </Section>
      <Section
        title={text.titles.career}
        more={{ label: text.top.careerMore, href: pathOf(lang, "career") }}
      >
        <CareerList companies={COMPANIES[lang]} brief />
      </Section>
      <Section title={text.top.contactTitle}>
        <Prose>
          <p>{text.top.contact}</p>
        </Prose>
        <LinkList links={contactLinks(lang)} />
      </Section>
    </Frame>
  );
}
