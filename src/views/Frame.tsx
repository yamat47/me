import type { Language, LinkGroup, LinkItem } from "@yamat47/pylon";
import { ProfileAside, ProfilePage, SiteFooter } from "@yamat47/pylon";
import type { ReactNode } from "react";
import { ACCOUNTS, TEXT } from "../content/text.ts";
import { LANGUAGES, LISTED_PAGES, otherLanguage, type PageName, pathOf } from "../routes.ts";
import { SITE } from "../site.ts";

type FrameProps = {
  lang: Language;
  // The page the reader is on. Left out on a page that is none of the site's, such as the one
  // for an address that leads nowhere.
  page?: PageName | undefined;
  children: ReactNode;
};

// The site's pages in one language, with the one the reader is on marked.
function pagesIn(lang: Language, current: PageName | undefined): LinkItem[] {
  return LISTED_PAGES.map((page) => ({
    label: TEXT[lang].titles[page],
    href: pathOf(lang, page),
    current: page === current,
  }));
}

/**
 * What every page has around its content: the profile column, and the footer under both.
 *
 * The same page in the other language is where the language links go; a page that is none of the
 * site's goes to the other language's top page.
 */
export function Frame({ lang, page, children }: FrameProps) {
  const text = TEXT[lang];
  const other = otherLanguage(lang);
  const top = pathOf(lang, "top");
  const pages = pagesIn(lang, page);
  const inOtherLanguage = pathOf(other, page ?? "top");

  const groups: LinkGroup[] = [
    { label: text.footer.site, links: pages },
    {
      label: text.footer.links,
      links: [...ACCOUNTS, { label: text.footer.blog, href: SITE.blog }],
    },
    {
      label: text.footer.language,
      // English first on either page, so that the two languages keep their places. On a page
      // that is none of the site's, neither link is the page the reader is on.
      links: LANGUAGES.map((language) => ({
        label: TEXT[language].languageName,
        href: pathOf(language, page ?? "top"),
        current: page !== undefined && language === lang,
        lang: language === lang ? undefined : language,
      })),
    },
  ];

  return (
    <ProfilePage
      lang={lang}
      aside={
        <ProfileAside
          name={text.name}
          href={top}
          description={text.description}
          photo={{ src: "/images/me.jpg", alt: text.photo }}
          heading={page === "top"}
          pages={pages}
          links={ACCOUNTS}
          language={{ label: TEXT[other].languageName, href: inOtherLanguage, lang: other }}
        />
      }
      footer={
        <SiteFooter
          name={text.name}
          href={top}
          description={text.description}
          groups={groups}
          // The year the site was built in.
          copyright={{ year: new Date().getFullYear(), holder: text.name }}
        />
      }
    >
      {children}
    </ProfilePage>
  );
}
