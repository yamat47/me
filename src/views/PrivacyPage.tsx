import type { Language } from "@yamat47/pylon";
import { PageHeader, Prose } from "@yamat47/pylon";
import { PRIVACY } from "../content/privacy.ts";
import { TEXT } from "../content/text.ts";
import { Frame } from "./Frame.tsx";

/** The privacy policy: what the site does with a visit, which is to report it to Google Analytics. */
export function PrivacyPage({ lang }: { lang: Language }) {
  const privacy = PRIVACY[lang];

  return (
    <Frame lang={lang} page="privacy">
      <PageHeader title={TEXT[lang].titles.privacy} />
      <Prose>
        <h2>{privacy.heading}</h2>
        <p>
          {privacy.beforeLink}
          <a href={privacy.link.href}>{privacy.link.label}</a>
          {privacy.afterLink}
        </p>
      </Prose>
    </Frame>
  );
}
