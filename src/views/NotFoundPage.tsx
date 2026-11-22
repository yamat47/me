import type { Language } from "@yamat47/pylon";
import { LinkList, PageHeader, Prose } from "@yamat47/pylon";
import { TEXT } from "../content/text.ts";
import { pathOf } from "../routes.ts";
import { Frame } from "./Frame.tsx";

/** What an address that leads nowhere shows. */
export function NotFoundPage({ lang }: { lang: Language }) {
  const { notFound } = TEXT[lang];

  return (
    <Frame lang={lang}>
      <PageHeader title={notFound.title} />
      <Prose>
        <p>{notFound.text}</p>
      </Prose>
      <LinkList links={[{ label: notFound.top, href: pathOf(lang, "top") }]} />
    </Frame>
  );
}
