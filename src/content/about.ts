// What the about page tells: an introduction, then one section for each thing.
import type { Language, LinkItem } from "@yamat47/pylon";
import { pathOf } from "../routes.ts";
import { SITE } from "../site.ts";
import type { Localized } from "./text.ts";

type AboutSectionEntry = {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly links: readonly LinkItem[];
};

type About = {
  readonly introduction: string;
  readonly sections: readonly AboutSectionEntry[];
};

const PLAYMAKER = "https://playmaker-demo.yamat47.me/";
const FILMROOM = "https://jpff-east-filmroom.yamat47.me/";
const CUTUPS = "https://cutups.yamat47.me/";
// The post about the games, on the blog. Its title is Japanese on either page.
const YAKUZA_POST = {
  label: "『龍が如く』のナンバリングを全部プレーした or 実況を観た",
  href: new URL("/entry/2025/09/07/194400", SITE.blog).href,
};

const page = (lang: Language, name: "career" | "projects", label: string): LinkItem => ({
  label,
  href: pathOf(lang, name),
});

export const ABOUT: Localized<About> = {
  en: {
    introduction:
      "I'm Takuya Yamaguchi. I lead a product organization at ONE CAREER Inc. in Tokyo, write open source on the side, and coach and play American football.",
    sections: [
      {
        title: "Work",
        paragraphs: [
          "I started out in 2016 as a Ruby on Rails engineer at Live Revolution, building the company's internal business systems. At CRASSONE I moved from engineering into product management. Since joining ONE CAREER in 2022 I have gone from software engineer to engineering manager, head of Product Development and, in 2026, executive officer.",
        ],
        links: [page("en", "career", "Career in detail")],
      },
      {
        title: "Open source",
        paragraphs: [
          "I still write code outside my job. japanese_address_parser, a Ruby gem that normalizes Japanese addresses, has been downloaded more than 260,000 times on RubyGems, and I contribute to tools I use, such as annotaterb.",
        ],
        links: [page("en", "projects", "Projects")],
      },
      {
        title: "American football",
        paragraphs: [
          "I coach a student team on Saturdays and play for an amateur team on Sundays. Several of my side projects come from it: playmaker draws and edits play diagrams, and JPFF East Filmroom and cutups put game film in order.",
        ],
        links: [
          { label: "playmaker", href: PLAYMAKER },
          { label: "JPFF East Filmroom", href: FILMROOM },
          { label: "cutups", href: CUTUPS },
        ],
      },
      {
        title: "Games",
        paragraphs: [
          "I have played every numbered Yakuza game, or at least watched someone else play it.",
        ],
        links: [{ ...YAKUZA_POST, lang: "ja" }],
      },
    ],
  },
  ja: {
    introduction:
      "山口 拓弥です。東京のワンキャリアでプロダクト組織を率いながら、個人でオープンソースを書き、アメリカンフットボールのコーチと選手をしています。",
    sections: [
      {
        title: "仕事",
        paragraphs: [
          "2016年にライブレボリューションで Ruby on Rails のエンジニアとしてキャリアを始め、社内の業務システムを開発しました。クラッソーネではエンジニアからプロダクトマネージャーに移りました。2022年にワンキャリアに入社してからは、ソフトウェアエンジニア、エンジニアリングマネージャー、プロダクト開発部の部長を経て、2026年から執行役員を務めています。",
        ],
        links: [page("ja", "career", "くわしい経歴")],
      },
      {
        title: "オープンソース",
        paragraphs: [
          "仕事の外でもコードを書いています。日本の住所を正規化する Ruby gem の japanese_address_parser は、RubyGems で26万回以上ダウンロードされています。annotaterb のように、自分が使っているツールへのコントリビュートもしています。",
        ],
        links: [page("ja", "projects", "プロジェクト")],
      },
      {
        title: "アメリカンフットボール",
        paragraphs: [
          "土曜日は学生チームのコーチをし、日曜日は社会人チームでプレーしています。個人プロジェクトのいくつかはここから生まれました。playmaker はプレー図を描いて編集するためのライブラリで、JPFF East Filmroom と cutups は試合映像を整理するサイトです。",
        ],
        links: [
          { label: "playmaker", href: PLAYMAKER },
          { label: "JPFF East Filmroom", href: FILMROOM },
          { label: "cutups", href: CUTUPS },
        ],
      },
      {
        title: "ゲーム",
        paragraphs: [
          "『龍が如く』のナンバリングタイトルは、すべて自分でプレーしたか、実況で観ました。",
        ],
        links: [YAKUZA_POST],
      },
    ],
  },
};
