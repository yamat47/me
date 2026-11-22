import type { Language } from "@yamat47/pylon";
import { CareerList, PageHeader } from "@yamat47/pylon";
import { COMPANIES } from "../content/career.ts";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

/** The career page: each company, and under it the roles held there. */
export function CareerPage({ lang }: { lang: Language }) {
  return (
    <Frame lang={lang} page="career">
      <PageHeader title={TEXT[lang].titles.career} />
      <CareerList companies={COMPANIES[lang]} />
    </Frame>
  );
}
