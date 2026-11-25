// The site's own words in each language: who the person is, what the pages are called, and the
// short labels around the lists. What the lists hold is in the files beside this one.
import type { Language, LinkItem } from "@yamat47/pylon";
import type { ListedPage } from "../routes.ts";

export type Localized<T> = Readonly<Record<Language, T>>;

type SiteText = {
  // The person's name, which is also the site's.
  readonly name: string;
  // One line under the name: what the person does.
  readonly description: string;
  // What the photo in the profile column shows, for a reader who cannot see it.
  readonly photo: string;
  readonly titles: Readonly<Record<ListedPage, string>>;
  // What a search result says under a page's title.
  readonly descriptions: Readonly<Record<ListedPage, string>>;
  // The name of this language, as the link from the other language's page says it.
  readonly languageName: string;
  readonly footer: {
    readonly site: string;
    readonly links: string;
    readonly language: string;
    readonly blog: string;
  };
  readonly top: {
    readonly introduction: string;
    readonly aboutMore: string;
    readonly projectsMore: (count: number) => string;
    readonly talksMore: (count: number) => string;
    readonly writingMore: (count: number) => string;
    readonly careerMore: string;
    readonly contactTitle: string;
    readonly contact: string;
    readonly email: string;
  };
  readonly notFound: { readonly title: string; readonly text: string; readonly top: string };
};

export const TEXT: Localized<SiteText> = {
  en: {
    name: "Takuya Yamaguchi",
    description: "Executive Officer and Head of Product Development at ONE CAREER Inc.",
    photo: "Takuya Yamaguchi standing on an American football field",
    titles: {
      about: "About",
      projects: "Projects",
      talks: "Talks",
      writing: "Writing",
      career: "Career",
    },
    descriptions: {
      about: "Who I am: my work, open source, American football and games.",
      projects: "What I build outside my job: open source libraries and small sites.",
      talks: "Talks I have given at conferences and meetups, with their slides.",
      writing: "Everything I have written, on my blog and elsewhere.",
      career: "Where I have worked, and the roles I held there.",
    },
    languageName: "English",
    footer: { site: "Site", links: "Links", language: "Language", blog: "Blog" },
    top: {
      introduction:
        "I lead a product organization of about 50 engineers, designers and product managers across 12 teams at ONE CAREER Inc. in Tokyo. I started out as a Ruby on Rails engineer, moved into engineering management, and now spend most of my time on product strategy and company-wide decisions. I still write open source on the side.",
      aboutMore: "More about me",
      projectsMore: (count) => `All ${count} projects`,
      talksMore: (count) => `All ${count} talks`,
      writingMore: (count) => `All ${count} articles`,
      careerMore: "Career in detail",
      contactTitle: "Contact",
      contact:
        "I'm happy to hear about speaking invitations, questions on hiring and building engineering organizations, and technical advising.",
      email: "Email",
    },
    notFound: {
      title: "Page not found",
      text: "There is no page at this address.",
      top: "Back to the top page",
    },
  },
  ja: {
    name: "山口 拓弥",
    description: "株式会社ワンキャリア 執行役員 / プロダクト開発部 部長",
    photo: "アメリカンフットボールのフィールドに立つ山口 拓弥",
    titles: {
      about: "自己紹介",
      projects: "プロジェクト",
      talks: "登壇",
      writing: "執筆",
      career: "経歴",
    },
    descriptions: {
      about: "仕事、オープンソース、アメリカンフットボール、ゲームについての自己紹介。",
      projects: "仕事の外でつくっているもの。オープンソースのライブラリや小さなサイト。",
      talks: "カンファレンスや勉強会での登壇と、そのスライド。",
      writing: "ブログやそのほかの場所に書いた記事の一覧。",
      career: "これまでに働いた会社と、そこでの役割。",
    },
    languageName: "日本語",
    footer: { site: "サイト", links: "リンク", language: "言語", blog: "ブログ" },
    top: {
      introduction:
        "東京のワンキャリアで、エンジニア・デザイナー・プロダクトマネージャーあわせて約50名、12チームのプロダクト組織を率いています。Ruby on Rails のエンジニアとしてキャリアを始め、エンジニアリングマネジメントを経て、いまはプロダクト戦略と全社の意思決定に多くの時間を使っています。個人ではオープンソースの開発も続けています。",
      aboutMore: "くわしい自己紹介",
      projectsMore: () => "プロジェクト一覧",
      talksMore: () => "登壇一覧",
      writingMore: () => "執筆一覧",
      careerMore: "くわしい経歴",
      contactTitle: "連絡先",
      contact:
        "登壇のご依頼、採用やエンジニア組織づくりについてのご相談、技術顧問のお話をお待ちしています。",
      email: "メール",
    },
    notFound: {
      title: "ページが見つかりません",
      text: "このアドレスにページはありません。",
      top: "トップページへ",
    },
  },
};

// Where else the person is. The profile column and the footer carry the accounts; the top
// page's contact section adds the address to write to.
const X: LinkItem = { label: "X", href: "https://x.com/yamat47" };
const GITHUB: LinkItem = { label: "GitHub", href: "https://github.com/yamat47" };
const LINKEDIN: LinkItem = { label: "LinkedIn", href: "https://www.linkedin.com/in/yamat47/" };
const EMAIL_ADDRESS = "yamat47.thirddown@gmail.com";

export const ACCOUNTS: readonly LinkItem[] = [X, GITHUB];

export function contactLinks(lang: Language): LinkItem[] {
  return [{ label: TEXT[lang].top.email, href: `mailto:${EMAIL_ADDRESS}` }, X, LINKEDIN, GITHUB];
}
