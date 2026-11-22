// Where I have worked, the latest company first, and inside each the roles I held, the latest
// first. Results of an employer's business are not published here (CLAUDE.md).
import type { Company } from "@yamat47/pylon";
import type { Localized } from "./text.ts";

export const COMPANIES: Localized<readonly Company[]> = {
  en: [
    {
      name: "ONE CAREER Inc.",
      roles: [
        {
          title: "Executive Officer",
          start: "2026-04",
          text: "Joined the executive team while continuing to head Product Development. Most of my time goes to product strategy and company-wide decisions.",
        },
        {
          title: "Head of Product Development",
          start: "2025-05",
          text: "Head of a newly formed department that brings engineers, designers and product managers together: about 50 people in 12 teams, solving business problems through product development.",
        },
        {
          title: "Senior Engineering Manager",
          start: "2024-01",
          end: "2025-04",
          text: "Managed the four development teams of the new-graduate business, about 25 people, some of them through their managers. Led the execution of the year's plan for the whole engineering organization, and strengthened the work on Ruby and Rails across teams.",
        },
        {
          title: "Engineering Manager",
          start: "2023-07",
          end: "2023-12",
          text: "Managed the eight-person team that develops the job-hunting service ONE CAREER: its people, its projects and its technical decisions.",
        },
        {
          title: "Software Engineer",
          start: "2022-12",
          end: "2023-06",
          text: "Developed and maintained ONE CAREER. Built a service that drafts application essays with ChatGPT, upgraded Ruby from 2.5 to 3.2 and Rails from 6.0 to 7.1, and introduced feature flags for safer releases.",
        },
      ],
    },
    {
      name: "CRASSONE Inc.",
      roles: [
        {
          title: "Product Manager",
          start: "2022-04",
          end: "2022-10",
          text: "Analysed where the business was held back, interviewed users, and led projects across departments, among them a redesign of the app's interface and a change to the service fee.",
        },
        {
          title: "Software Engineer",
          start: "2020-06",
          end: "2022-03",
          text: "Developed the demolition-work matching service CRASSONE: electronic contracts inside the app, real-time messaging, the move from weekly releases to a release per pull request, and Ruby upgrades with no downtime.",
        },
      ],
    },
    {
      name: "Live Revolution Co., Ltd.",
      roles: [
        {
          title: "Software Engineer",
          start: "2016-04",
          end: "2020-05",
          text: "Developed and maintained the company's internal business systems on Ruby on Rails: meeting agendas and minutes, room booking, task management and company-wide notices.",
        },
      ],
    },
  ],
  ja: [
    {
      name: "株式会社ワンキャリア",
      roles: [
        {
          title: "執行役員",
          start: "2026-04",
          text: "プロダクト開発部の部長を兼任しながら、執行役員を務めています。プロダクト戦略と全社の意思決定に多くの時間を使っています。",
        },
        {
          title: "プロダクト開発部 部長",
          start: "2025-05",
          text: "新設されたプロダクト開発部の部長。エンジニア・デザイナー・プロダクトマネージャーあわせて約50名、12チームで、プロダクト開発による事業課題の解決に取り組んでいます。",
        },
        {
          title: "シニアエンジニアリングマネージャー",
          start: "2024-01",
          end: "2025-04",
          text: "新卒事業に携わる4つの開発チーム（約25名）を、一部はマネージャーを介してマネジメントしました。エンジニア組織全体では当年の事業計画の実行をリードし、Ruby / Rails に関するチーム横断の連携を強めました。",
        },
        {
          title: "エンジニアリングマネージャー",
          start: "2023-07",
          end: "2023-12",
          text: "就活サービス「ONE CAREER」を開発する8名のチームで、ピープル・プロジェクト・テクノロジーのマネジメントを担当しました。",
        },
        {
          title: "ソフトウェアエンジニア",
          start: "2022-12",
          end: "2023-06",
          text: "「ONE CAREER」の開発と保守を担当しました。ChatGPT でエントリーシートを作成するサービス「ESの達人」の開発、Ruby 2.5 から 3.2、Rails 6.0 から 7.1 へのバージョンアップ、安全なリリースのための Feature Flags の導入を行いました。",
        },
      ],
    },
    {
      name: "株式会社クラッソーネ",
      roles: [
        {
          title: "プロダクトマネージャー",
          start: "2022-04",
          end: "2022-10",
          text: "事業上のボトルネックの分析、ユーザーインタビュー、部署をまたぐプロジェクトの推進を担当しました。アプリの UI リニューアルやサービス利用料の変更などを進めました。",
        },
        {
          title: "ソフトウェアエンジニア",
          start: "2020-06",
          end: "2022-03",
          text: "解体工事のマッチングサービス「クラッソーネ」を開発しました。アプリ内の電子契約、リアルタイムメッセージ、週次リリースからプルリクエスト単位のリリースへの移行、ダウンタイムなしの Ruby バージョンアップなどを担当しました。",
        },
      ],
    },
    {
      name: "株式会社ライブレボリューション",
      roles: [
        {
          title: "ソフトウェアエンジニア",
          start: "2016-04",
          end: "2020-05",
          text: "Ruby on Rails による社内の業務管理・支援システムを開発・保守しました。会議のアジェンダと議事録の共有、会議室予約、タスク管理、全社向けの告知などを担当しました。",
        },
      ],
    },
  ],
};
