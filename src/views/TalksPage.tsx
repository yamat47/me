import type { Language } from "@yamat47/pylon";
import { PageHeader, TalkFeature, TalkList } from "@yamat47/pylon";
import { newestSlide, talksIn } from "../content/talks.ts";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

/** The page of talks: the newest one with its first slide, then the rest by date. */
export function TalksPage({ lang }: { lang: Language }) {
  const [newest, ...earlier] = talksIn(lang);

  return (
    <Frame lang={lang} page="talks">
      <PageHeader title={TEXT[lang].titles.talks} count={earlier.length + 1} />
      <TalkFeature talk={newest} slide={newestSlide(lang)} />
      <TalkList talks={earlier} />
    </Frame>
  );
}
