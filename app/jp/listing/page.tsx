import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "施設掲載について | AkiMikke（あきみっけ）",
    description:
        "AkiMikkeへの障害福祉サービス事業所の掲載について、掲載対象サービス、掲載できる情報、掲載基準、情報更新方法をご案内します。",
    alternates: {
        canonical: "https://www.akimikke.com/jp/listing",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const formUrl =
    "https://script.google.com/a/macros/aokoma.com/s/AKfycbwcZlJCGQKFwZwQX3plnX2T8VH4aGeANOPgHwBM9Tm2jUxZZHLAdHbxGzUzH97wCI3v3g/exec";

const services = [
    "グループホーム（共同生活援助）",
    "生活介護",
    "就労継続支援A型・B型",
    "放課後等デイサービス",
    "児童発達支援",
    "ショートステイ（短期入所）",
    "障害者支援施設",
    "児童施設",
    "計画相談支援（障害児相談支援含む）",
];

const publishItems = [
    "施設名",
    "所在地・アクセス",
    "対応している障害種別",
    "空き状況・受け入れ状況",
    "送迎・医療的ケアなどの対応状況",
    "施設の特徴・紹介文",
    "施設写真",
    "問い合わせ先",
];

const standards = [
    "障害福祉サービスに関連する施設・事業所であること",
    "掲載内容が事実に基づいていること",
    "利用者やご家族に誤解を与える表現がないこと",
    "法令・公序良俗に反する内容を含まないこと",
];

const notAllowed = [
    "実態と異なる空き状況や受け入れ条件",
    "過度な誇大表現",
    "他施設を不当に比較・批判する内容",
    "個人情報や機密情報を含む内容",
];

export default function ListingPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <Link href="/" className="font-bold text-slate-600 hover:text-sky-700">
                    ← ホームへ戻る
                </Link>

                <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                    <p className="inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                        事業所向け
                    </p>

                    <h1 className="mt-6 text-3xl font-bold text-slate-900 md:text-5xl">
                        施設掲載について
                    </h1>

                    <p className="mt-6 text-base leading-8 text-slate-700 md:text-lg">
                        AkiMikke（あきみっけ）では、障害福祉サービス事業所の空き状況・施設情報の掲載を受け付けています。
                        このページでは、掲載対象サービス、掲載できる情報、掲載基準、掲載後の更新方法についてご案内します。
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/jp/recruit-facilities"
                            className="rounded-full bg-sky-600 px-7 py-4 text-center font-bold text-white hover:bg-sky-700"
                        >
                            無料掲載について見る
                        </Link>

                        <a
                            href={formUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-sky-600 bg-white px-7 py-4 text-center font-bold text-sky-700 hover:bg-sky-50"
                        >
                            施設情報登録フォームへ
                        </a>
                    </div>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">掲載対象サービス</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {services.map((service) => (
                            <li
                                key={service}
                                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold text-slate-800"
                            >
                                {service}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">掲載できる情報</h2>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                        {publishItems.map((item) => (
                            <li key={item} className="rounded-xl bg-sky-50 px-5 py-4 text-slate-800">
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">掲載基準</h2>
                    <ul className="mt-5 space-y-3 leading-8 text-slate-700">
                        {standards.map((item) => (
                            <li key={item}>・{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">掲載できない内容</h2>
                    <ul className="mt-5 space-y-3 leading-8 text-slate-700">
                        {notAllowed.map((item) => (
                            <li key={item}>・{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">掲載後の情報更新について</h2>
                    <p className="mt-5 leading-8 text-slate-700">
                        掲載後に、空き状況・施設情報・写真・問い合わせ先などに変更がある場合は、
                        施設情報修正依頼ページより更新依頼ができます。
                    </p>

                    <div className="mt-6">
                        <Link
                            href="/jp/facility-update"
                            className="inline-block rounded-full bg-slate-900 px-7 py-4 font-bold text-white hover:bg-slate-700"
                        >
                            施設情報修正依頼へ
                        </Link>
                    </div>
                </section>

                <section className="mt-8 rounded-3xl bg-sky-700 p-8 text-white shadow-sm md:p-10">
                    <h2 className="text-2xl font-bold md:text-3xl">
                        掲載をご希望の事業所様へ
                    </h2>

                    <p className="mt-5 leading-8 text-sky-50">
                        まずは無料掲載ページをご確認ください。施設情報登録フォームから掲載申請ができます。
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/jp/recruit-facilities"
                            className="rounded-full bg-white px-7 py-4 text-center font-bold text-sky-700 hover:bg-sky-50"
                        >
                            無料掲載について見る
                        </Link>

                        <Link
                            href="/jp/contact"
                            className="rounded-full border border-white px-7 py-4 text-center font-bold text-white hover:bg-sky-600"
                        >
                            お問い合わせ
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}