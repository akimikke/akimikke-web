// app/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { AuthHeader } from "./jp/_components/AuthHeader";

type ServiceOption = {
  value: string;
  label: string;
  description: string;
};

const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "gh", label: "グループホーム", description: "共同生活・住まいを探す" },
  { value: "sk", label: "生活介護", description: "日中活動・介護支援" },
  { value: "ab", label: "就労継続支援A/B型", description: "働く・訓練する場所" },
  { value: "hd", label: "放課後等デイサービス", description: "放課後の療育支援" },
  { value: "jh", label: "児童発達支援", description: "未就学児の発達支援" },
  { value: "ss", label: "ショートステイ", description: "短期入所・一時利用" },
  { value: "sn", label: "障害者支援施設", description: "入所系サービス" },
  { value: "jn", label: "児童施設", description: "児童の入所系施設" },
  { value: "tk", label: "相談支援事業", description: "計画相談・利用相談" },
];

const AREA_GROUPS = [
  {
    title: "北海道・東北",
    prefs: [
      ["hokkaido", "北海道"],
      ["aomori", "青森"],
      ["iwate", "岩手"],
      ["miyagi", "宮城"],
      ["akita", "秋田"],
      ["yamagata", "山形"],
      ["fukushima", "福島"],
    ],
  },
  {
    title: "関東",
    prefs: [
      ["tokyo", "東京"],
      ["kanagawa", "神奈川"],
      ["saitama", "埼玉"],
      ["chiba", "千葉"],
      ["ibaraki", "茨城"],
      ["tochigi", "栃木"],
      ["gunma", "群馬"],
    ],
  },
  {
    title: "中部",
    prefs: [
      ["aichi", "愛知"],
      ["shizuoka", "静岡"],
      ["gifu", "岐阜"],
      ["mie", "三重"],
      ["niigata", "新潟"],
      ["toyama", "富山"],
      ["ishikawa", "石川"],
      ["fukui", "福井"],
      ["yamanashi", "山梨"],
      ["nagano", "長野"],
    ],
  },
  {
    title: "近畿",
    prefs: [
      ["osaka", "大阪"],
      ["kyoto", "京都"],
      ["hyogo", "兵庫"],
      ["nara", "奈良"],
      ["shiga", "滋賀"],
      ["wakayama", "和歌山"],
    ],
  },
  {
    title: "中国・四国",
    prefs: [
      ["okayama", "岡山"],
      ["hiroshima", "広島"],
      ["yamaguchi", "山口"],
      ["tottori", "鳥取"],
      ["shimane", "島根"],
      ["tokushima", "徳島"],
      ["kagawa", "香川"],
      ["ehime", "愛媛"],
      ["kochi", "高知"],
    ],
  },
  {
    title: "九州・沖縄",
    prefs: [
      ["fukuoka", "福岡"],
      ["saga", "佐賀"],
      ["nagasaki", "長崎"],
      ["kumamoto", "熊本"],
      ["oita", "大分"],
      ["miyazaki", "宮崎"],
      ["kagoshima", "鹿児島"],
      ["okinawa", "沖縄"],
    ],
  },
];

function AdBox({ label }: { label: string }) {
  return <div style={adBoxStyle}>{label}</div>;
}

export default function Home() {
  const [pref, setPref] = useState("kanagawa");
  const [service, setService] = useState("gh");
  const [keyword, setKeyword] = useState("");

  const listHref = useMemo(() => {
    const keywordText = keyword.trim();

    if (keywordText) {
      const params = new URLSearchParams();
      params.set("q", keywordText);

      return `/jp/all/all?${params.toString()}`;
    }

    return `/jp/${encodeURIComponent(pref)}/${encodeURIComponent(service)}`;
  }, [pref, service, keyword]);

  const makeListHref = (nextPref: string) => {
    return `/jp/${encodeURIComponent(nextPref)}`;
  };

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .home-search-row {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .home-search-row select,
          .home-search-row input,
          .home-search-row button {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <main style={pageStyle}>
        <section style={heroStyle}>
          <div style={heroAuthStyle}>
            <AuthHeader />
          </div>
          <div style={heroBadgeStyle}>障害福祉サービスの空き情報検索</div>

          <Link href="/" style={heroLogoLinkStyle}>
            <img src="/akimikke-logo.png" alt="AkiMikke" style={heroLogoImageStyle} />
            <span style={heroTitleStyle}>AkiMikke</span>
          </Link>

          <p style={heroLeadStyle}>
            地域・サービス・条件から、空きのある障害福祉事業所を探せます。
          </p>

          <div className="home-search-row" style={searchPanelStyle}>
            <select value={pref} onChange={(e) => setPref(e.target.value)} style={selectStyle}>
              {AREA_GROUPS.flatMap((g) =>
                g.prefs.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))
              )}
            </select>

            <select value={service} onChange={(e) => setService(e.target.value)} style={selectStyle}>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="市区町村・駅名・施設名など"
              style={inputStyle}
            />

            <Link href={listHref} style={searchButtonStyle}>
              検索する
            </Link>
          </div>
        </section>

        <AdBox label="地域広告枠：企業・行政・医療機関など" />

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>地域から探す</h2>
            <p style={sectionLeadStyle}>エリアを選んで、近くのサービスを探せます。</p>
          </div>

          <div style={areaGridStyle}>
            {AREA_GROUPS.map((group) => (
              <div key={group.title} style={areaCardStyle}>
                <h3 style={areaTitleStyle}>{group.title}</h3>
                <div style={prefButtonWrapStyle}>
                  {group.prefs.map(([value, label]) => (
                    <Link
                      key={value}
                      href={makeListHref(value)}
                      onClick={() => setPref(value)}
                      style={value === pref ? prefButtonActiveStyle : prefButtonStyle}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>サービス別に探す</h2>
            <p style={sectionLeadStyle}>利用したいサービスから空き情報を確認できます。</p>
          </div>

          <div style={serviceGridStyle}>
            {SERVICE_OPTIONS.map((s) => (
              <Link
                key={s.value}
                href={`/jp/all/${s.value}`}
                style={{
                  ...(s.value === service ? serviceCardActiveStyle : serviceCardStyle),
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <span style={serviceNameStyle}>{s.label}</span>
                <span style={serviceDescStyle}>{s.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <AdBox label="バナー広告枠" />

        <section style={appBannerStyle}>
          <div>
            <h2 style={appTitleStyle}>アプリでもっと探しやすく</h2>
            <p style={appLeadStyle}>
              お気に入り登録や空き状況の確認を、スマホアプリからも利用できます。
            </p>
          </div>
          <div style={appButtonWrapStyle}>
            <a
              href="https://apps.apple.com/jp/app/akimikke-%E3%81%82%E3%81%8D%E3%81%BF%E3%81%A3%E3%81%91/id6755669123"
              target="_blank"
              rel="noreferrer"
              style={storeBadgeStyle}
            >
              App Store
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.akimikke.app&hl=ja"
              target="_blank"
              rel="noreferrer"
              style={storeBadgeStyle}
            >
              Google Play
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  padding: 24,
  fontFamily: "system-ui, -apple-system",
  background: "#f8fafc",
};

const heroStyle: CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  borderRadius: 24,
  padding: "18px 24px 24px",
  background: "linear-gradient(135deg, #e0f2fe 0%, #ffffff 58%, #ecfdf5 100%)",
  border: "1px solid #dbeafe",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  position: "relative",
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

const heroLogoLinkStyle: CSSProperties = {
  marginTop: 12,
  display: "flex",
  alignItems: "center",
  gap: 12,
  textDecoration: "none",
  color: "inherit",
};

const heroLogoImageStyle: CSSProperties = {
  width: 48,
  height: 48,
  objectFit: "contain",
};

const heroTitleStyle: CSSProperties = {
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
};

const heroLeadStyle: CSSProperties = {
  marginTop: 10,
  color: "#475569",
  fontSize: 15,
  lineHeight: 1.8,
};

const searchPanelStyle: CSSProperties = {
  marginTop: 20,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 2fr auto",
  gap: 10,
};

const selectStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  background: "#fff",
  fontWeight: 700,
};

const inputStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  background: "#fff",
};

const searchButtonStyle: CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  background: "#0284c7",
  color: "#fff",
  fontWeight: 900,
  textDecoration: "none",
  textAlign: "center",
};

const sectionStyle: CSSProperties = {
  maxWidth: 1120,
  margin: "28px auto 0",
};

const sectionHeaderStyle: CSSProperties = {
  marginBottom: 14,
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 24,
  fontWeight: 900,
  color: "#0f172a",
};

const sectionLeadStyle: CSSProperties = {
  marginTop: 6,
  color: "#64748b",
};

const areaGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const areaCardStyle: CSSProperties = {
  padding: 16,
  borderRadius: 18,
  background: "#fff",
  border: "1px solid #e5e7eb",
};

const areaTitleStyle: CSSProperties = {
  margin: "0 0 10px",
  fontSize: 16,
  fontWeight: 900,
};

const prefButtonWrapStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const prefButtonStyle: CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  textDecoration: "none",
  color: "#111827",
};

const prefButtonActiveStyle: CSSProperties = {
  ...prefButtonStyle,
  border: "1px solid #0284c7",
  background: "#e0f2fe",
  color: "#0369a1",
  fontWeight: 900,
};

const serviceGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const serviceCardStyle: CSSProperties = {
  textAlign: "left",
  padding: 18,
  borderRadius: 18,
  background: "#fff",
  border: "1px solid #e5e7eb",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
};

const serviceCardActiveStyle: CSSProperties = {
  ...serviceCardStyle,
  border: "2px solid #0284c7",
  background: "#f0f9ff",
};

const serviceNameStyle: CSSProperties = {
  display: "block",
  fontSize: 17,
  fontWeight: 900,
  color: "#0f172a",
};

const serviceDescStyle: CSSProperties = {
  display: "block",
  marginTop: 6,
  color: "#64748b",
  fontSize: 13,
};

const adBoxStyle: CSSProperties = {
  maxWidth: 1120,
  margin: "24px auto 0",
  padding: 18,
  borderRadius: 18,
  border: "1px dashed #cbd5e1",
  background: "#ffffff",
  color: "#64748b",
  textAlign: "center",
  fontWeight: 700,
};

const appBannerStyle: CSSProperties = {
  maxWidth: 1120,
  margin: "28px auto 0",
  padding: 22,
  borderRadius: 22,
  background: "#111827",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
};

const appTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 900,
};

const appLeadStyle: CSSProperties = {
  marginTop: 8,
  color: "#d1d5db",
};

const appButtonWrapStyle: CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

const storeBadgeStyle: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  background: "#fff",
  color: "#111827",
  fontWeight: 900,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const heroAuthStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 12,
};
