import type { Language } from "@yamat47/pylon";
import { AboutSection, Introduction, PageHeader } from "@yamat47/pylon";
import { ABOUT } from "../content/about.ts";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

/** The about page: an introduction, then one section for each thing it tells. */
export function AboutPage({ lang }: { lang: Language }) {
  const about = ABOUT[lang];

  return (
    <Frame lang={lang} page="about">
      <PageHeader title={TEXT[lang].titles.about} />
      <Introduction lang={lang}>{about.introduction}</Introduction>
      {
        // TODO: the photograph that opens the page (a `Picture`, 3:2) and the photographs of the
        // sections (`photos`), once there are some. A place left tinted would read as a page that
        // failed to load, so until then the page has no picture.
      }
      {about.sections.map((section) => (
        <AboutSection key={section.title} title={section.title} links={section.links}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </AboutSection>
      ))}
    </Frame>
  );
}
