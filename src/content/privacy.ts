// What the privacy policy says: that the site reports its visits to Google Analytics, which the
// tag's terms require of a site that uses it, with the link to Google's own account of what it
// does with the data (section 7 of https://marketingplatform.google.com/about/analytics/terms/jp/).
import type { Localized } from "./text.ts";

type Privacy = {
  readonly heading: string;
  // The paragraph, around the link to Google's account, which it names.
  readonly beforeLink: string;
  readonly link: { readonly label: string; readonly href: string };
  readonly afterLink: string;
};

export const PRIVACY: Localized<Privacy> = {
  en: {
    heading: "Analytics",
    beforeLink:
      "This site uses Google Analytics, Google's tool for analyzing visits. Google Analytics uses cookies to collect data. The data is collected anonymously and does not identify you. You can refuse the collection by turning cookies off in your browser's settings. For how Google uses the data, see ",
    link: {
      label: "How Google uses information from sites or apps that use our services",
      href: "https://policies.google.com/technologies/partner-sites?hl=en",
    },
    afterLink: ".",
  },
  ja: {
    heading: "アクセス解析について",
    // One line: a line break between two Japanese sentences would show as a space.
    beforeLink:
      "当サイトでは、Google によるアクセス解析ツール「Google アナリティクス」を使用しています。Google アナリティクスは、データの収集のために Cookie を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。Cookie を無効にすることで収集を拒否できますので、お使いのブラウザーの設定をご確認ください。データの扱いについて詳しくは「",
    link: {
      label: "Google のサービスを使用するサイトやアプリから収集した情報の Google による使用",
      href: "https://policies.google.com/technologies/partner-sites?hl=ja",
    },
    afterLink: "」をご覧ください。",
  },
};
