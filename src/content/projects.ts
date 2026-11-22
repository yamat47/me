// What I build outside my job, in the order the site shows it. The list is chosen by hand.
import type { Language, LinkItem, Project } from "@yamat47/pylon";
import type { Localized } from "./text.ts";

// Where a project is. The label follows from the kind, so that every project names its code, its
// package and its site the same way.
type Place = {
  readonly kind: "code" | "rubygems" | "npm" | "demo" | "site";
  readonly href: string;
};

type ProjectEntry = {
  readonly name: string;
  // The year it began, and the year it ended where it has.
  readonly start: string;
  readonly end?: string;
  readonly description: Localized<string>;
  readonly places: readonly Place[];
  // A 16:10 screenshot under public/, and what it shows.
  readonly screenshot?: { readonly src: string; readonly alt: Localized<string> };
};

const LABELS: Readonly<Record<Place["kind"], Localized<string>>> = {
  code: { en: "GitHub", ja: "GitHub" },
  rubygems: { en: "RubyGems", ja: "RubyGems" },
  npm: { en: "npm", ja: "npm" },
  demo: { en: "Demo", ja: "デモ" },
  site: { en: "Site", ja: "サイト" },
};

const repository = (name: string, owner = "yamat47") => `https://github.com/${owner}/${name}`;

const PROJECTS: readonly ProjectEntry[] = [
  {
    name: "japanese_address_parser",
    start: "2021",
    description: {
      en: "Ruby gem that normalizes Japanese addresses. More than 260,000 downloads on RubyGems.",
      ja: "日本の住所を正規化する Ruby gem。RubyGems で26万回以上ダウンロードされています。",
    },
    places: [
      { kind: "code", href: repository("japanese_address_parser") },
      { kind: "rubygems", href: "https://rubygems.org/gems/japanese_address_parser" },
      { kind: "demo", href: "https://japanese-address-parser.yamat47.me/" },
    ],
    screenshot: {
      src: "/images/projects/japanese-address-parser.jpeg",
      alt: {
        en: "The demo page of japanese_address_parser, with a field for an address",
        ja: "住所の入力欄がある japanese_address_parser のデモページ",
      },
    },
  },
  {
    name: "playmaker",
    start: "2025",
    description: {
      en: "TypeScript library for drawing and editing American football play diagrams.",
      ja: "アメリカンフットボールのプレー図を描いて編集するための TypeScript ライブラリ。",
    },
    places: [
      { kind: "code", href: repository("playmaker") },
      { kind: "npm", href: "https://www.npmjs.com/package/@yamat47/playmaker" },
      { kind: "demo", href: "https://playmaker-demo.yamat47.me/" },
    ],
    screenshot: {
      src: "/images/projects/playmaker.jpeg",
      alt: {
        en: "The playmaker demo, a play diagram on a football field",
        ja: "フィールドの上にプレー図が描かれた playmaker のデモ",
      },
    },
  },
  {
    name: "activerecord_accessible_json",
    start: "2021",
    end: "2021",
    description: {
      en: "Ruby gem that lets ActiveRecord's JSON attributes be read with string or symbol keys.",
      ja: "ActiveRecord の JSON 属性を、文字列でもシンボルでも読めるようにする Ruby gem。",
    },
    places: [
      { kind: "code", href: repository("activerecord_accessible_json") },
      { kind: "rubygems", href: "https://rubygems.org/gems/activerecord_accessible_json" },
    ],
    screenshot: {
      src: "/images/projects/activerecord-accessible-json.jpeg",
      alt: {
        en: "The page of activerecord_accessible_json on RubyGems",
        ja: "RubyGems にある activerecord_accessible_json のページ",
      },
    },
  },
  {
    name: "JPFF East Filmroom",
    start: "2026",
    description: {
      en: "Unofficial fan site that arranges the game videos of the J.P.F.F East YouTube channel by season, team and game type.",
      ja: "J.P.F.F East の YouTube チャンネルにある試合動画を、シーズン・チーム・試合種別で整理した非公式ファンサイト。",
    },
    places: [
      { kind: "site", href: "https://jpff-east-filmroom.yamat47.me/" },
      { kind: "code", href: repository("jpff-east-filmroom") },
    ],
    screenshot: {
      src: "/images/projects/jpff-east-filmroom.jpeg",
      alt: {
        en: "The top page of JPFF East Filmroom, a search for games",
        ja: "試合を検索できる JPFF East Filmroom のトップページ",
      },
    },
  },
  {
    name: "cutups",
    start: "2026",
    description: {
      en: "Football game film clips from Instagram and X, organized by formation, motion and scheme.",
      ja: "Instagram と X に上がっているアメフトの試合映像を、フォーメーション・モーション・スキームで整理したサイト。",
    },
    places: [
      { kind: "site", href: "https://cutups.yamat47.me/" },
      { kind: "code", href: repository("cutups") },
    ],
    screenshot: {
      src: "/images/projects/cutups.jpeg",
      alt: {
        en: "The top page of cutups, a list of film clips",
        ja: "映像クリップが並ぶ cutups のトップページ",
      },
    },
  },
  {
    name: "Rails Active Search demo",
    start: "2026",
    end: "2026",
    description: {
      en: "Rails Active Search on SQLite FTS5: the Rails Guides searched with three tokenizers, running in the browser on ruby.wasm.",
      ja: "SQLite FTS5 で動く Rails Active Search。Rails ガイドを3つのトークナイザで検索でき、ruby.wasm でブラウザの中で動きます。",
    },
    places: [
      { kind: "demo", href: "https://rails-active-search.yamat47.me/" },
      { kind: "code", href: repository("rails-active-search-sqlite-demo") },
    ],
    screenshot: {
      src: "/images/projects/rails-active-search.jpeg",
      alt: {
        en: "The Rails Active Search demo, the results of one search under three tokenizers",
        ja: "ひとつの検索の結果を3つのトークナイザで並べた Rails Active Search のデモ",
      },
    },
  },
  {
    name: "Word Counter",
    start: "2025",
    end: "2025",
    description: {
      en: "Counts words and characters as you type. The text never leaves the browser.",
      ja: "入力したそばから単語と文字を数えます。テキストはブラウザの外に出ません。",
    },
    places: [
      { kind: "site", href: "https://word-counter.yamat47.me/" },
      { kind: "code", href: repository("word-counter") },
    ],
    screenshot: {
      src: "/images/projects/word-counter.jpeg",
      alt: {
        en: "Word Counter, a text field beside the counts of words and characters",
        ja: "テキストの入力欄と、単語数・文字数が並ぶ Word Counter",
      },
    },
  },
  {
    name: "annotaterb",
    start: "2025",
    description: {
      en: "Contributor: the --nested-position option and position_in_class: after_doc.",
      ja: "コントリビュート：--nested-position オプションと position_in_class: after_doc。",
    },
    places: [{ kind: "code", href: repository("annotaterb", "drwl") }],
    screenshot: {
      src: "/images/projects/annotaterb.jpeg",
      alt: {
        en: "My merged pull requests to annotaterb, listed on GitHub",
        ja: "GitHub に並ぶ、annotaterb にマージされた自分のプルリクエスト",
      },
    },
  },
];

const linkTo = (place: Place, lang: Language): LinkItem => ({
  label: LABELS[place.kind][lang],
  href: place.href,
});

// The projects as a page in one language shows them.
export function projectsIn(lang: Language): Project[] {
  return PROJECTS.map((project) => ({
    name: project.name,
    start: project.start,
    end: project.end,
    description: project.description[lang],
    links: project.places.map((place) => linkTo(place, lang)),
    screenshot: project.screenshot && {
      src: project.screenshot.src,
      alt: project.screenshot.alt[lang],
    },
  }));
}
