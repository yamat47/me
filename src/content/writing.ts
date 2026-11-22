// What I have written: the articles published somewhere other than the blog, kept here by hand,
// and the list a page shows, which puts them together with the blog's posts.
import type { Article, Language } from "@yamat47/pylon";
import type { BlogPost } from "../lib/blog-posts.ts";

// An article as this file keeps it. Every one of them is in Japanese.
type Written = { readonly date: string; readonly title: string; readonly href: string };

const note = (id: string) => `https://note.com/dev_onecareer/n/${id}`;
const zenn = (id: string) => `https://zenn.dev/yamat47/articles/${id}`;
// CRASSONE's tech blog is no longer published, so its articles are read from the Internet
// Archive's copies.
const crassone = (snapshot: string, slug: string) =>
  `https://web.archive.org/web/${snapshot}/https://tech.crassone.jp/posts/${slug}`;

export const ELSEWHERE: readonly Written[] = [
  {
    date: "2023-12-18",
    title: "ワンキャリアで初めて挑戦した「エンジニアリングマネージャーのしごと」",
    href: note("na8ada4874a3c"),
  },
  {
    date: "2023-12-08",
    title: "「技術的負債に向き合う Online Conference」のLT大会に参加してきました",
    href: note("nd3ac374d3774"),
  },
  {
    date: "2023-09-29",
    title: "Rails で Playwright が公式にサポートされたので RSpec 経由で使ってみた",
    href: note("n67d25088b100"),
  },
  {
    date: "2023-07-24",
    title: "Fakerの日本語ローカライズにOSS活動を通して貢献してみた話",
    href: note("n3e0e2df5c801"),
  },
  {
    date: "2022-11-07",
    title:
      ".orを使ってActiveRecordのスコープを定義するときは.mergeで囲わないと意図しない挙動になるかも？",
    href: crassone("20250714235607", "use-merge-with-activerecord-scope-or-condition"),
  },
  {
    date: "2022-04-20",
    title: "「当たり前」のことをしつづけたら四半期のMVPに選ばれた話",
    href: crassone("20251209234626", "mvv-award-winning-report"),
  },
  {
    date: "2022-02-03",
    title: "アプリのコードの修正だけでRailsサーバーを3倍早くした話",
    href: crassone("20251113235303", "server-response-time-became-three-times-faster"),
  },
  {
    date: "2021-08-18",
    title: "1200行あったRuboCopのTodoを半年かけて（ほぼ）解消した話",
    href: crassone("20251113225942", "resolve-rubocop-todos-step-by-step"),
  },
  {
    date: "2021-06-23",
    title: "Constraintオブジェクトを使ってルーティング設定が担う役割を広げてみよう",
    href: crassone("20251113230352", "simplify-rails-routing-configuration-with-constraint-object"),
  },
  {
    date: "2020-12-29",
    title: "RuboCop ChallengerをGitHub Actionsで動かす",
    href: zenn("219e14ebcf31a1d13ff4"),
  },
  {
    date: "2020-11-06",
    title: "Docker環境でもGitのcommitやpushの前にRubocopのチェックをする",
    href: zenn("a9b0b4d937ce03b695e9"),
  },
  {
    date: "2020-10-20",
    title: "Capistranoで動的な値をセットするときはProcを渡そう",
    href: zenn("027d9974bfccc6f63ece"),
  },
  {
    date: "2020-09-23",
    title: "ActiveModelのバリデータでJSON型のカラムを検証する",
    href: zenn("c86e320e31b907958cd4"),
  },
];

// Everything written, wherever it was published, newest first. Every title is Japanese, so a
// page in another language is told so.
export function articlesIn(
  lang: Language,
  blogPosts: readonly BlogPost[],
  elsewhere: readonly Written[] = ELSEWHERE,
): Article[] {
  const titleLang = lang === "ja" ? undefined : "ja";
  return [...blogPosts, ...elsewhere]
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .map(({ date, title, href }) => ({ date, title, href, lang: titleLang }));
}
