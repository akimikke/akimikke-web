import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "../_components/SiteHeader";
import { PageContainer } from "../_components/PageContainer";

const PREF_MAP: Record<string, string> = {
    hokkaido: "北海道",
    aomori: "青森県",
    iwate: "岩手県",
    miyagi: "宮城県",
    akita: "秋田県",
    yamagata: "山形県",
    fukushima: "福島県",
    ibaraki: "茨城県",
    tochigi: "栃木県",
    gunma: "群馬県",
    saitama: "埼玉県",
    chiba: "千葉県",
    tokyo: "東京都",
    kanagawa: "神奈川県",
    niigata: "新潟県",
    toyama: "富山県",
    ishikawa: "石川県",
    fukui: "福井県",
    yamanashi: "山梨県",
    nagano: "長野県",
    gifu: "岐阜県",
    shizuoka: "静岡県",
    aichi: "愛知県",
    mie: "三重県",
    shiga: "滋賀県",
    kyoto: "京都府",
    osaka: "大阪府",
    hyogo: "兵庫県",
    nara: "奈良県",
    wakayama: "和歌山県",
    tottori: "鳥取県",
    shimane: "島根県",
    okayama: "岡山県",
    hiroshima: "広島県",
    yamaguchi: "山口県",
    tokushima: "徳島県",
    kagawa: "香川県",
    ehime: "愛媛県",
    kochi: "高知県",
    fukuoka: "福岡県",
    saga: "佐賀県",
    nagasaki: "長崎県",
    kumamoto: "熊本県",
    oita: "大分県",
    miyazaki: "宮崎県",
    kagoshima: "鹿児島県",
    okinawa: "沖縄県",
};

const SERVICES = [
    {
        key: "gh",
        title: "グループホーム",
        desc: "共同生活・住まいを探す",
    },
    {
        key: "sk",
        title: "生活介護",
        desc: "日中活動・介護支援",
    },
    {
        key: "ab",
        title: "就労継続支援A/B型",
        desc: "働く・訓練する場所",
    },
    {
        key: "hd",
        title: "放課後等デイサービス",
        desc: "放課後の療育支援",
    },
    {
        key: "jh",
        title: "児童発達支援",
        desc: "未就学児の発達支援",
    },
    {
        key: "ss",
        title: "ショートステイ",
        desc: "短期入所・一時利用",
    },
    {
        key: "sn",
        title: "障害者支援施設",
        desc: "入所系サービス",
    },
    {
        key: "jn",
        title: "児童施設",
        desc: "児童の入所系施設",
    },
    {
        key: "tk",
        title: "相談支援事業",
        desc: "計画相談・利用相談",
    },
];

type PageParams = {
    pref: string;
};

export default async function PrefPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const p = await params;

    const prefSlug = String(p.pref ?? "");
    const prefName = PREF_MAP[prefSlug] ?? prefSlug;

    return (
        <PageContainer>
            <style>{`
              .mobileBreak {
                display: inline;
              }
              @media (max-width: 600px) {
                .mobileBreak {
                  display: block;
                }
              }
            `}</style>

            <SiteHeader />

            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <Link
                    href="/"
                    style={{
                        color: "#111827",
                        textDecoration: "none",
                        fontWeight: 700,
                    }}
                >
                    ← ホームへ戻る
                </Link>

                <Link
                    href="/jp/favorites"
                    style={{
                        color: "#111827",
                        textDecoration: "none",
                        fontWeight: 700,
                    }}
                >
                    お気に入り
                </Link>
            </div>

            <section style={heroStyle}>
                <div style={heroBadgeStyle}>
                    地域別サービス検索
                </div>

                <h1 style={heroTitleStyle}>
                    {prefName}の
                    <span className="mobileBreak">
                        障害福祉サービス
                    </span>
                </h1>

                <p style={heroLeadStyle}>
                    利用したいサービスを選択してください。
                </p>
            </section>

            <div style={serviceGridStyle}>
                {SERVICES.map((service) => (
                    <Link
                        key={service.key}
                        href={`/jp/${prefSlug}/${service.key}`}
                        style={serviceCardStyle}
                    >
                        <div style={serviceTitleStyle}>
                            {service.title}
                        </div>

                        <div style={serviceDescStyle}>
                            {service.desc}
                        </div>
                    </Link>
                ))}
            </div>
        </PageContainer>
    );
}

const heroStyle: CSSProperties = {
    marginTop: 24,
    borderRadius: 24,
    padding: "28px 24px",
    background:
        "linear-gradient(135deg, #e0f2fe 0%, #ffffff 58%, #ecfdf5 100%)",
    border: "1px solid #dbeafe",
};

const heroBadgeStyle: CSSProperties = {
    display: "inline-flex",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ffffff",
    color: "#0369a1",
    fontSize: 13,
    fontWeight: 800,
    border: "1px solid #bae6fd",
};

const heroTitleStyle: CSSProperties = {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 36,
    fontWeight: 900,
    color: "#0f172a",
};

const heroLeadStyle: CSSProperties = {
    marginTop: 10,
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.8,
};

const serviceGridStyle: CSSProperties = {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
};

const serviceCardStyle: CSSProperties = {
    borderRadius: 20,
    border: "1px solid #e5e7eb",
    background: "#fff",
    padding: 22,
    textDecoration: "none",
    color: "#111827",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
};

const serviceTitleStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: 900,
};

const serviceDescStyle: CSSProperties = {
    marginTop: 8,
    color: "#64748b",
    lineHeight: 1.7,
    fontSize: 14,
};