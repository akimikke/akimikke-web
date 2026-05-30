// app/jp/[pref]/[service]/page.tsx
import Link from "next/link";
import { DisabilityFilter } from "../../_components/DisabilityFilter";
import { FacilityListClient } from "../../_components/FacilityListClient";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/app/jp/_components/SiteHeader";
import { PageContainer } from "@/app/jp/_components/PageContainer";
import { RegionSelectClient } from "@/app/jp/_components/RegionSelectClient";

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
  all: "",
};

const SERVICE_LABEL: Record<string, string> = {
  sk: "生活介護",
  gh: "グループホーム",
  ab: "就労継続A/B",
  hd: "放課後等デイ",
  jh: "児童発達支援",
  ss: "ショートステイ",
  sn: "障害者支援施設(入所)",
  jn: "児童施設(入所)",
  tk: "計画相談支援",
};

const SERVICE_DESCRIPTION: Record<string, string> = {
  gh: "共同生活援助（グループホーム）の空き情報を検索できます。",
  sk: "生活介護事業所の日中活動・介護支援の空き情報を確認できます。",
  ab: "就労継続支援A型・B型の空き情報を検索できます。",
  hd: "放課後等デイサービスの空き情報を確認できます。",
  jh: "児童発達支援の空き情報を検索できます。",
  ss: "ショートステイ・日中一時支援の空き情報を確認できます。",
  sn: "障害者支援施設（入所系）の空き情報を検索できます。",
  jn: "児童施設（入所系）の空き情報を検索できます。",
  tk: "計画相談支援事業所の新規受入状況を確認できます。",
};

const DISABILITY_OPTIONS_BY_SERVICE: Record<string, string[]> = {
  sk: ["知的障害", "精神障害", "身体障害", "高次脳機能障害"],
  gh: ["知的障害", "精神障害", "身体障害", "高次脳機能障害"],
  ab: [],
  hd: [],
  jh: [],
  ss: [],
  sn: [],
  jn: [],
  tk: [],
};

function prefNameFromSlug(pref: string) {
  return PREF_MAP[pref] ?? pref;
}

function isValidService(service: string) {
  return Object.prototype.hasOwnProperty.call(SERVICE_LABEL, service);
}

type PageParams = { pref: string; service: string };
type SP = Record<string, string | string[] | undefined>;

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const p = await params;

  const prefName = prefNameFromSlug(p.pref);
  const serviceLabel = SERVICE_LABEL[p.service] ?? p.service;

  return {
    title: `${prefName}｜${serviceLabel}の空き情報・施設一覧｜あきみっけ`,
    description: `${prefName}の${serviceLabel}の空き情報を一覧で検索。空きあり施設の比較・問い合わせができます。`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams?: Promise<SP>;
}) {
  const p = await params;
  const sp = (await searchParams) ?? {};

  const prefSlug = String(p.pref ?? "").trim();
  const serviceKey = String(p.service ?? "").trim().toLowerCase();

  const heroStyle: CSSProperties = {
    marginBottom: 24,
    borderRadius: 24,
    padding: "24px 20px",
    background:
      "linear-gradient(135deg, #e0f2fe 0%, #ffffff 55%, #ecfdf5 100%)",
    border: "1px solid #dbeafe",
  };

  const heroBadgeStyle: CSSProperties = {
    display: "inline-flex",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ffffff",
    color: "#0369a1",
    fontSize: 12,
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
    width: 42,
    height: 42,
    objectFit: "contain",
  };

  const heroTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.1,
    fontWeight: 900,
    color: "#0f172a",
  };

  const heroLeadStyle: CSSProperties = {
    marginTop: 8,
    marginLeft: 54,
    color: "#475569",
    fontSize: 14,
  };

  if (!prefSlug || !isValidService(serviceKey)) {
    return (
      <PageContainer>
        <section style={heroStyle}>
          <Link href="/" style={heroLogoLinkStyle}>
            <img src="/akimikke-logo.png" alt="AkiMikke" style={heroLogoImageStyle} />
            <span style={heroTitleStyle}>AkiMikke</span>
          </Link>
        </section>
        <section style={heroStyle}>
          <div style={heroBadgeStyle}>
            障害福祉サービスの空き情報検索
          </div>

          <Link href="/" style={heroLogoLinkStyle}>
            <img
              src="/akimikke-logo.png"
              alt="AkiMikke"
              style={heroLogoImageStyle}
            />

            <span style={heroTitleStyle}>
              AkiMikke
            </span>
          </Link>

          <p style={heroLeadStyle}>
            地域・サービス・条件から、利用できる事業所を探せます。
          </p>
        </section>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}></div>
        <Link href="/" style={{ color: "#111", textDecoration: "none" }}>← 戻る</Link>
        <h1 style={{ marginTop: 12, fontSize: 24, fontWeight: 800 }}>URLが不正です</h1>
        <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
          pref: {prefSlug}
          {"\n"}service: {serviceKey}
        </pre>
      </PageContainer>
    );
  }

  const prefName = prefNameFromSlug(prefSlug);
  const serviceLabel = SERVICE_LABEL[serviceKey] ?? serviceKey;
  const disabilityOptions = DISABILITY_OPTIONS_BY_SERVICE[serviceKey] ?? [];
  const isAllPref = prefSlug === "all";
  const pageTitle = isAllPref
    ? `全国 / ${serviceLabel} 施設一覧`
    : `${prefName} / ${serviceLabel} 施設一覧`;

  const dmRaw = Array.isArray(sp.dm) ? sp.dm[0] : sp.dm;
  const disRaw = Array.isArray(sp.dis) ? sp.dis[0] : sp.dis;
  const vacantRaw = Array.isArray(sp.vacant) ? sp.vacant[0] : sp.vacant;
  const cityRaw = Array.isArray(sp.city) ? sp.city[0] : sp.city;
  const areaPrefRaw = Array.isArray(sp.area_pref) ? sp.area_pref[0] : sp.area_pref;
  const qRaw = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const orderRaw = Array.isArray(sp.order) ? sp.order[0] : sp.order;
  const shuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;
  const bathRaw = Array.isArray(sp.f_bath) ? sp.f_bath[0] : sp.f_bath;
  const daysupportRaw = Array.isArray(sp.f_daysupport) ? sp.f_daysupport[0] : sp.f_daysupport;

  const ghFacilityRaw = Array.isArray(sp.f_facility) ? sp.f_facility[0] : sp.f_facility;
  const ghRoomRaw = Array.isArray(sp.f_room) ? sp.f_room[0] : sp.f_room;
  const ghSexRaw = Array.isArray(sp.f_sex) ? sp.f_sex[0] : sp.f_sex;

  const ghFacilityCsv = String(ghFacilityRaw ?? "");
  const ghRoomCsv = String(ghRoomRaw ?? "");
  const ghSexCsv = String(ghSexRaw ?? "");

  const abTypeRaw = Array.isArray(sp.f_type) ? sp.f_type[0] : sp.f_type;
  const abShuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;

  const abTypeCsv = String(abTypeRaw ?? "");
  const abShuttleCsv = String(abShuttleRaw ?? "");

  const hdFailureRaw = Array.isArray(sp.f_failure_hd) ? sp.f_failure_hd[0] : sp.f_failure_hd;
  const hdMedicalCareRaw = Array.isArray(sp.f_medical_care) ? sp.f_medical_care[0] : sp.f_medical_care;
  const hdDaySupportRaw = Array.isArray(sp.f_daysupport) ? sp.f_daysupport[0] : sp.f_daysupport;
  const hdShuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;

  const hdFailureCsv = String(hdFailureRaw ?? "");
  const hdMedicalCareCsv = String(hdMedicalCareRaw ?? "");
  const hdDaySupportCsv = String(hdDaySupportRaw ?? "");
  const hdShuttleCsv = String(hdShuttleRaw ?? "");

  const jhFailureRaw = Array.isArray(sp.f_failurejh) ? sp.f_failurejh[0] : sp.f_failurejh;
  const jhMedicalCareRaw = Array.isArray(sp.f_medicalcare) ? sp.f_medicalcare[0] : sp.f_medicalcare;
  const jhShuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;

  const jhFailureCsv = String(jhFailureRaw ?? "");
  const jhMedicalCareCsv = String(jhMedicalCareRaw ?? "");
  const jhShuttleCsv = String(jhShuttleRaw ?? "");

  const ssFailureRaw = Array.isArray(sp.f_failuresss) ? sp.f_failuresss[0] : sp.f_failuresss;
  const ssDaySupportRaw = Array.isArray(sp.f_daysupport) ? sp.f_daysupport[0] : sp.f_daysupport;
  const ssSexRaw = Array.isArray(sp.f_sex) ? sp.f_sex[0] : sp.f_sex;

  const ssFailureCsv = String(ssFailureRaw ?? "");
  const ssDaySupportCsv = String(ssDaySupportRaw ?? "");
  const ssSexCsv = String(ssSexRaw ?? "");

  const snDisabilitiesRaw = Array.isArray(sp.f_disabilitiessn) ? sp.f_disabilitiessn[0] : sp.f_disabilitiessn;
  const snShuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;

  const snDisabilitiesCsv = String(snDisabilitiesRaw ?? "");
  const snShuttleCsv = String(snShuttleRaw ?? "");

  const jnFacilityTypeRaw = Array.isArray(sp.f_failurejn) ? sp.f_failurejn[0] : sp.f_failurejn;
  const jnShuttleRaw = Array.isArray(sp.f_shuttle) ? sp.f_shuttle[0] : sp.f_shuttle;

  const jnFacilityTypeCsv = String(jnFacilityTypeRaw ?? "");
  const jnShuttleCsv = String(jnShuttleRaw ?? "");

  const tkTargetsRaw = Array.isArray(sp.f_targetstk) ? sp.f_targetstk[0] : sp.f_targetstk;
  const tkAcceptRaw = Array.isArray(sp.f_accepttk) ? sp.f_accepttk[0] : sp.f_accepttk;

  const tkTargetsCsv = String(tkTargetsRaw ?? "");
  const tkAcceptCsv = String(tkAcceptRaw ?? "");

  const dm = String(dmRaw ?? "OR").toUpperCase() === "AND" ? "AND" : "OR";
  const disCsv = String(disRaw ?? "");
  const onlyVacant = String(vacantRaw ?? "") === "1";
  const city = String(cityRaw ?? "");
  const areaPref = String(areaPrefRaw ?? "");
  const effectivePrefForRegions = prefSlug === "all" ? areaPref : prefSlug;
  const q = String(qRaw ?? "");
  const order = String(orderRaw ?? "updated_desc");
  const shuttle = String(shuttleRaw ?? "") === "あり";
  const bath = String(bathRaw ?? "") === "あり";
  const daysupport = String(daysupportRaw ?? "") === "あり";

  const qs = new URLSearchParams();
  qs.set("service", serviceKey);

  if (!isAllPref) {
    qs.set("pref", prefSlug);
  }

  for (const [k, v] of Object.entries(sp)) {
    const value = Array.isArray(v) ? v[0] : v;
    if (value && String(value).trim()) qs.set(k, String(value).trim());
  }

  const apiPath = `/api/v1/facilities/search?${qs.toString()}`;

  const regionQs = new URLSearchParams();
  regionQs.set("service", serviceKey);
  regionQs.set("pref", prefSlug);

  const regionRes = await fetch(
    `http://localhost:3001/api/v1/facilities/regions?${regionQs.toString()}`,
    { cache: "no-store" }
  ).catch(() => null);

  const regionJson = regionRes
    ? await regionRes.json().catch(() => null)
    : null;

  const regions: string[] = Array.isArray(regionJson?.regions)
    ? regionJson.regions
    : [];

  const prefectures = Array.isArray(regionJson?.prefectures)
    ? regionJson.prefectures
    : [];

  const hasSearched = !!String(city).trim();

  return (
    <>
      <style>{`
      @media (max-width: 900px) {
        .akimikke-list-layout {
          display: block !important;
        }

        .akimikke-filter-panel {
          position: static !important;
          max-height: none !important;
          overflow: visible !important;
          margin-bottom: 20px !important;
        }
      }
    `}</style>

      <main
        style={{
          padding: 24,
          fontFamily: "system-ui, -apple-system",
          maxWidth: 1680,
          margin: "0 auto",
        }}
      >
        <SiteHeader />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{ color: "#111", textDecoration: "none", fontWeight: 600 }}>
            ← 戻る
          </Link>

          <Link href="/jp/favorites" style={{ color: "#111", textDecoration: "none", fontWeight: 600 }}>
            お気に入り
          </Link>
        </div>

        <h1 style={{ marginTop: 16, fontSize: 36, lineHeight: 1.3, fontWeight: 800 }}>
          {pageTitle}
        </h1>

        <p
          style={{
            marginTop: 10,
            color: "#64748b",
            lineHeight: 1.8,
            fontSize: 14,
          }}
        >
          {SERVICE_DESCRIPTION[serviceKey] ?? "障害福祉サービスを検索できます。"}
        </p>

        <p style={{ marginTop: 10, color: "#555", fontSize: 15, lineHeight: 1.7 }}>
          都道府県とサービス種別ごとの施設一覧です。障害種別で絞り込みながら、
          空き状況の確認や詳細ページへの遷移ができます。
        </p>

        <div
          className="akimikke-list-layout"
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "520px minmax(0, 1fr)",
            gap: 24,
            alignItems: "start",
          }}
        >

          <section
            className="akimikke-filter-panel"
            style={{
              position: "sticky",
              top: 20,
              alignSelf: "start",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 18,
              background: "#fafafa",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>絞り込み条件</div>

            <form method="GET" style={{ display: "grid", gap: 14 }}>
              <RegionSelectClient
                prefectures={prefectures}
                initialPref={effectivePrefForRegions}
                initialCity={city}
              />

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="q" style={{ fontWeight: 700, color: "#111827" }}>
                  フリーワード
                </label>
                <input
                  id="q"
                  name="q"
                  type="text"
                  defaultValue={q}
                  placeholder="例：横須賀、中央、久里浜"
                  style={{
                    width: "100%",
                    maxWidth: 420,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#111827",
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="order" style={{ fontWeight: 700, color: "#111827" }}>
                  並び順
                </label>
                <select
                  id="order"
                  name="order"
                  defaultValue={order}
                  style={{
                    width: "100%",
                    maxWidth: 260,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#111827",
                    fontSize: 14,
                  }}
                >
                  <option value="updated_desc">おすすめ順</option>
                  <option value="name_asc">名前順（昇順）</option>
                  <option value="name_desc">名前順（降順）</option>
                  <option value="code_asc">コード順</option>
                </select>
              </div>

              {disabilityOptions.length > 0 ? (
                <DisabilityFilter
                  initialDm={dm as "OR" | "AND"}
                  initialDisCsv={disCsv}
                  options={disabilityOptions}
                  label="障害種別"
                />
              ) : null}

              {serviceKey === "sk" ? (
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontWeight: 700, color: "#111827" }}>生活介護の追加条件</div>

                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      <input type="checkbox" name="f_shuttle" value="あり" defaultChecked={shuttle} />
                      送迎あり
                    </label>

                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      <input type="checkbox" name="f_bath" value="あり" defaultChecked={bath} />
                      入浴あり
                    </label>

                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="f_daysupport"
                        value="あり"
                        defaultChecked={daysupport}
                      />
                      日中一時支援あり
                    </label>
                  </div>
                </div>
              ) : null}

              {serviceKey === "gh" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>グループホームの追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設形態</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["包括型", "日中支援型", "外部利用型"].map((v) => {
                        const checked = ghFacilityCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_facility"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設種類</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["シェア型", "アパート型"].map((v) => {
                        const checked = ghRoomCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_room"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>性別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["男性棟", "女性棟", "混合棟"].map((v) => {
                        const checked = ghSexCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_sex"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "ab" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>就労継続支援A/Bの追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>A型 / B型</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["A型", "B型"].map((v) => {
                        const checked = abTypeCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_type"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設送迎</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = abShuttleCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_shuttle"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "hd" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>放課後等デイサービスの追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>障害児種別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["障害児", "重症心身障害児"].map((v) => {
                        const checked = hdFailureCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_failure_hd"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>医療的ケア児</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["対応可", "非対応"].map((v) => {
                        const checked = hdMedicalCareCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_medical_care"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>日中一時支援</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = hdDaySupportCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_daysupport"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設送迎</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = hdShuttleCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_shuttle"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "jh" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>児童発達支援の追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>障害児種別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["障害児", "重症心身障害児", "難聴児"].map((v) => {
                        const checked = jhFailureCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_failurejh"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>医療的ケア児</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["対応可", "非対応"].map((v) => {
                        const checked = jhMedicalCareCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_medicalcare"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設送迎</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = jhShuttleCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_shuttle"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "ss" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>ショートステイ / 日中一時支援の追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>障害種別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["知的障害", "精神障害", "身体障害", "重症心身障害", "高次脳機能障害", "障害児"].map((v) => {
                        const checked = ssFailureCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_failuresss"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>日中一時支援</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = ssDaySupportCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_daysupport"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>性別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["男性", "女性", "児童"].map((v) => {
                        const checked = ssSexCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_sex"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "sn" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>障害者支援施設の追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>障害種別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["身体障害施設", "知的障害施設"].map((v) => {
                        const checked = snDisabilitiesCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_disabilitiessn"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設送迎</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = snShuttleCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_shuttle"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "jn" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>児童施設の追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設種別</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["福祉型", "医療型"].map((v) => {
                        const checked = jnFacilityTypeCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_failurejn"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>施設送迎</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["あり", "なし"].map((v) => {
                        const checked = jnShuttleCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_shuttle"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {serviceKey === "tk" ? (
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#111827" }}>計画相談支援の追加条件</div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>対象区分</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["知的障害", "精神障害", "身体障害", "障害児", "特定なし"].map((v) => {
                        const checked = tkTargetsCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_targetstk"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>新規受入</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["できる", "できない"].map((v) => {
                        const checked = tkAcceptCsv.split(",").map((x) => x.trim()).includes(v);
                        return (
                          <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <input
                              type="checkbox"
                              name="f_accepttk"
                              value={v}
                              defaultChecked={checked}
                            />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                <input type="checkbox" name="vacant" value="1" defaultChecked={onlyVacant} />
                空きありのみ表示
              </label>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: "#111",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  検索する
                </button>

                <Link
                  href={`/jp/${prefSlug}/${serviceKey}`}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#111",
                    textDecoration: "none",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  条件をクリア
                </Link>
              </div>
            </form>
          </section>

          <div style={{ minWidth: 0 }}>
            {hasSearched ? (
              <FacilityListClient apiPath={apiPath} prefSlug={prefSlug} serviceKey={serviceKey} />
            ) : (
              <section
                style={{
                  marginTop: 20,
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 24,
                  background: "#fff",
                  color: "#4b5563",
                  lineHeight: 1.8,
                }}
              >
                地域を選択して「検索する」を押すと、該当する施設一覧が表示されます。
              </section>
            )}
          </div>
        </div >
      </main >
    </>
  );
}