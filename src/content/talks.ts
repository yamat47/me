// The talks I have given, newest first. A talk is dated by the day of its event, not by the day
// its slides were uploaded, which is the date Speaker Deck shows and is often later.
import type { Image, Language, LinkItem, Talk } from "@yamat47/pylon";
import type { Localized } from "./text.ts";

// A name that exists in one language only, with that language.
type Named = { readonly name: string; readonly lang: Language };

export type TalkEntry = {
  // The day of the event, as YYYY-MM-DD.
  readonly date: string;
  // The title in both languages, as the slides carry it, or the one title a talk has.
  readonly title: Localized<string> | Named;
  readonly event?: Localized<string> | Named;
  readonly slides: string;
  readonly video?: string;
  readonly eventPage?: string;
  // The first slide, a 16:9 picture under public/. Only the newest talk shows it.
  readonly firstSlide?: string;
};

const deck = (slug: string) => `https://speakerdeck.com/onecareer_tech/${slug}`;

const TALKS: readonly TalkEntry[] = [
  {
    date: "2026-04-16",
    title: {
      ja: "AIがマネジメントを奪った今、EMは何で価値を生むのか？",
      en: "Now that AI has taken over management, how can engineering managers create value?",
    },
    event: { name: "EM Meetup #20", lang: "en" },
    slides: deck(
      "now-that-ai-has-taken-over-management-how-can-engineering-managers-ems-create-value",
    ),
    eventPage: "https://engineering-manager-meetup.connpass.com/event/388254/",
    firstSlide: "/images/talks/2026-04-16.jpg",
  },
  {
    // TODO: this is the day the slides were uploaded. No event is named on them; replace it with
    // the day the talk was given once that is known.
    date: "2025-10-20",
    title: {
      ja: "ワンキャリアにおけるEMの役割と育て方",
      en: "The role and development of engineering managers at ONE CAREER",
    },
    slides: deck("the-role-and-development-of-engineering-managers-at-onecareer"),
  },
  {
    date: "2025-07-03",
    title: {
      ja: "「開発生産性」ではなく、事業の投資対効果に向き合う「事業生産性」へ",
      en: 'From "development productivity" to "business productivity"',
    },
    event: {
      ja: "開発生産性Conference 2025",
      en: "Development Productivity Conference 2025",
    },
    slides: deck(
      "from-development-productivity-to-business-productivity-that-focuses-on-business-return-on-investment",
    ),
    video: "https://conference.findy-code.io/conferences/dev-productivity-con-2025/2/archives/64",
    eventPage: "https://dev-productivity-con.findy-code.io/2025",
  },
  {
    date: "2025-06-25",
    title: {
      ja: "ワンキャリアにおける複数 Rails API サーバーの共通データベース運用事例",
      en: "Operating one database shared by several Rails API servers",
    },
    event: { name: "プロダクト成長を支える技術選定と開発文化 〜現場の知見LT大会〜", lang: "ja" },
    slides: deck("onecareers-common-database-operation-for-multiple-rails-api-servers"),
    eventPage: "https://sansan.connpass.com/event/352765/",
  },
  {
    date: "2025-04-16",
    title: {
      ja: "ワンキャリアのエンジニア組織における「投資対効果」との向き合い方・使い方",
      en: 'How an engineering organization deals with and uses "return on investment"',
    },
    event: { name: "事業価値は測れるのか？開発における投資対効果の高め方", lang: "ja" },
    slides: deck(
      "how-to-deal-with-and-use-return-on-investment-in-onecareers-engineering-organization",
    ),
    eventPage: "https://developer-productivity-engineering.connpass.com/event/346761/",
  },
  {
    date: "2024-09-11",
    title: { name: "“Good First Issue” - “First” = ?", lang: "en" },
    event: { name: "D-Plus Tokyo #6", lang: "en" },
    slides: deck("good-first-issue-first-equals"),
    eventPage: "https://d-plus.connpass.com/event/328644/",
  },
  {
    date: "2024-04-30",
    title: {
      ja: "Rails 8.0 のマイルストーンから窺う Ruby on Rails が目指す未来",
      en: "The future of Ruby on Rails as seen from the milestones of Rails 8.0",
    },
    event: { name: "Railsの伝統と革新をつなぐ各社の取り組み", lang: "ja" },
    slides: deck("the-future-of-ruby-on-rails-as-seen-from-the-milestones-of-rails-8-dot-0"),
    eventPage: "https://sansan.connpass.com/event/315821/",
  },
  {
    date: "2024-01-25",
    title: {
      ja: "ONE CAREER にあえて残している技術的負債の紹介",
      en: "Technical debt we dare to leave in ONE CAREER",
    },
    event: { name: "TechBrew in 東京", lang: "ja" },
    slides: deck("introduction-of-technical-debt-that-we-dare-to-leave-in-one-career"),
    eventPage: "https://findy.connpass.com/event/306451/",
  },
  {
    date: "2023-11-21",
    title: {
      ja: "CI/CDプロセスの拡充からはじめる技術的負債の解消",
      en: "Eliminating technical debt, starting with CI/CD",
    },
    event: { name: "技術的負債に向き合う Online Conference", lang: "ja" },
    slides: deck("cd-processes"),
    eventPage: "https://findy.connpass.com/event/297813/",
  },
];

const LABELS = {
  slides: { en: "Slides", ja: "スライド" },
  video: { en: "Video", ja: "動画" },
  event: { en: "Event", ja: "イベント" },
} as const satisfies Record<string, Localized<string>>;

// A name as a page in `lang` shows it: its text, and its language where that is not the page's.
function shown(name: Localized<string> | Named, lang: Language): { text: string; lang?: Language } {
  if (!("name" in name)) return { text: name[lang] };
  return name.lang === lang ? { text: name.name } : { text: name.name, lang: name.lang };
}

function linksOf(talk: TalkEntry, lang: Language): LinkItem[] {
  const places = [
    { label: LABELS.slides[lang], href: talk.slides },
    { label: LABELS.video[lang], href: talk.video },
    { label: LABELS.event[lang], href: talk.eventPage },
  ];
  return places.flatMap(({ label, href }) => (href === undefined ? [] : [{ label, href }]));
}

// The talks as a page in one language shows them, newest first.
export function talksIn(lang: Language, talks: readonly TalkEntry[] = TALKS): [Talk, ...Talk[]] {
  const [newest, ...rest] = talks.map((talk): Talk => {
    const title = shown(talk.title, lang);
    const event = talk.event && shown(talk.event, lang);
    return {
      title: title.text,
      lang: title.lang,
      date: talk.date,
      event: event && { name: event.text, lang: event.lang },
      links: linksOf(talk, lang),
    };
  });
  if (newest === undefined) throw new Error("There is no talk to show.");
  return [newest, ...rest];
}

// The first slide of the newest talk, where there is a picture of it.
export function newestSlide(lang: Language): Image | undefined {
  const newest = TALKS[0];
  if (newest?.firstSlide === undefined) return undefined;
  const title = shown(newest.title, lang).text;
  const alt = lang === "en" ? `The first slide of "${title}"` : `「${title}」の最初のスライド`;
  return { src: newest.firstSlide, alt };
}
