import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "掲載施設募集中 | AkiMikke",
  description:
    "障害福祉サービス事業所を無料で掲載できます。グループホーム、生活介護、就労継続支援、放課後等デイサービスなどの施設情報をAkiMikkeへ掲載しませんか。",
  keywords: [
    "障害福祉",
    "障害福祉サービス",
    "施設掲載",
    "無料掲載",
    "グループホーム",
    "生活介護",
    "就労継続支援",
    "放課後等デイサービス",
    "児童発達支援",
    "ショートステイ",
    "AkiMikke",
  ],
  alternates: {
    canonical: "https://www.akimikke.com/jp/recruit-facilities",
  },
  openGraph: {
    title: "掲載施設募集中 | AkiMikke",
    description:
      "障害福祉サービス事業所を無料で掲載できます。施設情報・空き状況をAkiMikkeへ掲載しませんか。",
    url: "https://www.akimikke.com/jp/recruit-facilities",
    siteName: "AkiMikke",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const formUrl =
  "https://script.google.com/a/macros/aokoma.com/s/AKfycbwcZlJCGQKFwZwQX3plnX2T8VH4aGeANOPgHwBM9Tm2jUxZZHLAdHbxGzUzH97wCI3v3g/exec";

const services = [
  "グループホーム",
  "生活介護",
  "就労継続支援A型/B型",
  "放課後等デイサービス",
  "児童発達支援",
  "ショートステイ",
  "障害者支援施設",
  "児童施設",
  "計画相談支援",
];

const benefits = [
  "相談支援専門員へ施設情報を届けられる",
  "利用者・ご家族に空き状況を知ってもらえる",
  "空き枠・受け入れ状況をリアルタイムに掲載できる",
  "施設写真や特徴を掲載できる",
];

const flow = [
  "登録フォーム入力",
  "AkiMikke事務局で内容確認",
  "掲載開始",
  "掲載後も情報更新可能",
];

export default function RecruitFacilitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-sky-100 to-white px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white">
            掲載施設募集中
          </p>

          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            障害福祉サービス事業所を
            <br />
            無料で掲載できます
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
            AkiMikkeは、障害福祉サービスの空き状況を探している
            相談支援専門員・利用者・ご家族に向けて、施設情報を届ける検索サイトです。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-sky-600 px-8 py-4 text-base font-bold text-white shadow hover:bg-sky-700"
            >
              無料掲載フォームへ
            </a>

            <Link
              href="/jp/contact"
              className="rounded-full border border-sky-600 bg-white px-8 py-4 text-base font-bold text-sky-700 hover:bg-sky-50"
            >
              掲載について問い合わせる
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            掲載費無料・施設写真掲載可能・情報更新対応
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            AkiMikkeに掲載するメリット
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            掲載対象サービス
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center font-bold text-slate-800"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            掲載までの流れ
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {flow.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <p className="font-bold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-700 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            まずは無料で施設情報を掲載しませんか？
          </h2>

          <p className="mt-5 leading-8 text-sky-50">
            空き状況や施設の特徴を掲載することで、
            必要としている相談支援専門員・利用者・ご家族に情報を届けやすくなります。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-4 font-bold text-sky-700 hover:bg-sky-50"
            >
              無料掲載フォームへ
            </a>

            <Link
              href="/jp/contact"
              className="rounded-full border border-white px-8 py-4 font-bold text-white hover:bg-sky-600"
            >
              問い合わせる
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}