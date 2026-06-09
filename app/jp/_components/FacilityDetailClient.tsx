"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";

type Facility = {
    serviceKey?: string;
    code?: string;
    name?: string;
    prefecture?: string;
    region?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    vacant?: string;
    vacantDetail?: string;
    vacantUpdatedAt?: string;
    accepttk?: string;
    daySupport?: string;
    summary?: string;
    transit?: string;
    cost?: string;
    appeal?: string;
    officialSiteUrl?: string;
    images?: string[] | string;
    disabilityTags?: string[] | string;
    shuttle?: string;
    bath?: string;
    daysupport?: string;
    failure?: string;
    facility?: string;
    room?: string;
    sex?: string;
    type?: string;
    failureHd?: string;
    medicalCareHd?: string;
    medicalCareJh?: string;
    failureJh?: string;
    failureSss?: string;
    availability?: SsAvailabilityDay[];
    disabilitiesSn?: string;
    failureJn?: string;
    acceptTk?: string;
    targetsTk?: string;
    bathing?: string;
    day_support?: string;
    hdDisability?: string;
    hd_disability?: string;
    medCareChild?: string;
    med_care_child?: string;
    jhDisability?: string;
    jh_disability?: string;
    ssDisability?: string;
    ss_disability?: string;
    snDisability?: string;
    sn_disability?: string;
    jnDisability?: string;
    jn_disability?: string;
};

type SsAvailabilityDay = {
    date: string;
    rooms: number;
    note?: string;
};

function normalizeAcceptText(raw: any) {
    const v = String(raw ?? "").trim();
    if (!v) return "不明";
    const low = v.toLowerCase();
    if (["可", "可能", "できる", "ok", "〇", "○", "yes", "true"].includes(low)) return "できる";
    if (["不可", "不可能", "できない", "ng", "×", "no", "false"].includes(low)) return "できない";
    return v;
}

function badgeStyle(value: string | undefined): React.CSSProperties {
    const v = String(value ?? "").trim();

    if (v === "あり" || v === "できる") {
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#ecfdf5",
            color: "#047857",
            border: "1px solid #a7f3d0",
            fontWeight: 800,
            fontSize: 14,
        };
    }

    if (v === "なし" || v === "できない") {
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#f9fafb",
            color: "#6b7280",
            border: "1px solid #e5e7eb",
            fontWeight: 800,
            fontSize: 14,
        };
    }

    return {
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: 999,
        background: "#eff6ff",
        color: "#1d4ed8",
        border: "1px solid #bfdbfe",
        fontWeight: 800,
        fontSize: 14,
    };
}

function actionButtonStyle(kind: "primary" | "secondary"): React.CSSProperties {
    if (kind === "primary") {
        return {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 16px",
            borderRadius: 12,
            background: "#111827",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 800,
            border: "1px solid #111827",
            minHeight: 48,
        };
    }

    return {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 16px",
        borderRadius: 12,
        background: "#ffffff",
        color: "#111827",
        textDecoration: "none",
        fontWeight: 800,
        border: "1px solid #d1d5db",
        minHeight: 48,
    };
}

function normalizeImages(raw: string[] | string | undefined): string[] {
    if (!raw) return [];

    if (Array.isArray(raw)) {
        return raw.map((x) => String(x).trim()).filter(Boolean);
    }

    const s = String(raw).trim();
    if (!s) return [];

    // JSON配列っぽい文字列
    if (s.startsWith("[") && s.endsWith("]")) {
        try {
            const arr = JSON.parse(s);
            if (Array.isArray(arr)) {
                return arr.map((x) => String(x).trim()).filter(Boolean);
            }
        } catch {
            // 下の通常処理へ
        }
    }

    // カンマ区切りも許容
    if (s.includes(",")) {
        return s.split(",").map((x) => x.trim()).filter(Boolean);
    }

    return [s];
}

function normalizeTagList(raw: string[] | string | undefined): string[] {
    if (!raw) return [];

    if (Array.isArray(raw)) {
        return raw.map((x) => String(x).trim()).filter(Boolean);
    }

    const s = String(raw).trim();
    if (!s) return [];

    if (s.startsWith("{") && s.endsWith("}")) {
        return s
            .slice(1, -1)
            .split(",")
            .map((x) => x.trim().replace(/^"(.*)"$/, "$1"))
            .filter(Boolean);
    }

    if (s.startsWith("[") && s.endsWith("]")) {
        try {
            const arr = JSON.parse(s);
            if (Array.isArray(arr)) {
                return arr.map((x) => String(x).trim()).filter(Boolean);
            }
        } catch {
            // 通常処理へ
        }
    }

    if (s.includes(",")) {
        return s.split(",").map((x) => x.trim()).filter(Boolean);
    }

    return [s];
}

function normalizeCsvList(raw: string | undefined): string[] {
    const s = String(raw ?? "").trim();
    if (!s) return [];

    return s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
}

function pick(...values: any[]) {
    for (const v of values) {
        const s = String(v ?? "").trim();
        if (s) return s;
    }
    return "";
}

function displayOrUnknown(...values: any[]) {
    return pick(...values) || "不明";
}

function normalizeDriveImageUrl(url: string) {
    const s = String(url ?? "").trim();
    if (!s) return "";

    const decoded = s.replace(/&amp;/g, "&");

    const idMatch =
        decoded.match(/\/d\/([^/]+)/) ||
        decoded.match(/[?&]id=([^&]+)/);

    const id = idMatch?.[1];
    if (!id) return decoded;

    return `https://lh3.googleusercontent.com/d/${id}=w1000`;
}

function formatDateOnly(value: any) {
    const s = String(value ?? "").trim();
    if (!s) return "";

    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;

    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function normalizeSsAvailability(raw: any): SsAvailabilityDay[] {
    if (!Array.isArray(raw)) return [];

    return raw
        .map((d) => ({
            date: String(d?.date ?? "").trim(),
            rooms: Number(d?.rooms ?? 0),
            note: String(d?.note ?? "").trim() || undefined,
        }))
        .filter((d) => d.date);
}

function SsAvailabilityCalendar({ days }: { days: SsAvailabilityDay[] }) {
    if (!days.length) {
        return (
            <div style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 14,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#6b7280",
            }}>
                3ヶ月先までの空き状況は未登録です。
            </div>
        );
    }

    return (
        <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 800, marginBottom: 10, color: "#111827" }}>
                3ヶ月先までの空き状況
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 10,
            }}>
                {days.map((d) => {
                    const hasRoom = d.rooms > 0;

                    return (
                        <div
                            key={d.date}
                            style={{
                                border: hasRoom ? "1px solid #86efac" : "1px solid #e5e7eb",
                                borderRadius: 12,
                                padding: 12,
                                background: hasRoom ? "#f0fdf4" : "#f9fafb",
                            }}
                        >
                            <div style={{ fontWeight: 800, color: "#111827" }}>
                                {d.date}
                            </div>
                            <div style={{
                                marginTop: 6,
                                fontWeight: 800,
                                color: hasRoom ? "#047857" : "#6b7280",
                            }}>
                                {hasRoom ? `${d.rooms}枠あり` : "空きなし"}
                            </div>
                            {d.note ? (
                                <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>
                                    {d.note}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function CollapsibleText({ text }: { text: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div
                style={{
                    display: open ? "block" : "-webkit-box",
                    WebkitLineClamp: open ? "unset" : 3,
                    WebkitBoxOrient: "vertical" as any,
                    overflow: "hidden",
                    color: "#374151",
                    lineHeight: 1.8,
                }}
            >
                {text}
            </div>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                style={{
                    marginTop: 8,
                    border: "none",
                    background: "transparent",
                    color: "#2563eb",
                    fontWeight: 800,
                    cursor: "pointer",
                    padding: 0,
                }}
            >
                {open ? "閉じる" : "続きを読む"}
            </button>
        </div>
    );
}

const heroStyle: React.CSSProperties = {
    marginBottom: 24,
    borderRadius: 24,
    padding: "24px 20px",
    background:
        "linear-gradient(135deg, #e0f2fe 0%, #ffffff 55%, #ecfdf5 100%)",
    border: "1px solid #dbeafe",
};

const heroBadgeStyle: React.CSSProperties = {
    display: "inline-flex",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ffffff",
    color: "#0369a1",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid #bae6fd",
};

const heroLogoLinkStyle: React.CSSProperties = {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "inherit",
};

const heroLogoImageStyle: React.CSSProperties = {
    width: 42,
    height: 42,
    objectFit: "contain",
};

const heroTitleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 46,
    lineHeight: 1.1,
    fontWeight: 900,
    color: "#0f172a",
};

const heroLeadStyle: React.CSSProperties = {
    marginTop: 8,
    marginLeft: 54,
    color: "#475569",
    fontSize: 14,
};

export function FacilityDetailClient(props: {
    apiPath: string;
    prefSlug: string;
    serviceKey: string;
    initialDisCsv?: string;
}) {
    const { apiPath, prefSlug, serviceKey, initialDisCsv } = props;

    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [facility, setFacility] = useState<Facility | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setLoading(true);
            setErrorText(null);

            try {
                const res = await fetch(apiPath, { cache: "no-store" });
                const data = await res.json().catch(() => null);

                if (!res.ok) {
                    throw new Error(data?.error || `HTTP ${res.status}`);
                }

                if (!cancelled) {
                    setFacility(data?.facility ?? null);
                }
            } catch (e: any) {
                if (!cancelled) setErrorText(String(e?.message ?? e));
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [apiPath]);

    if (loading) {
        return (
            <main
                style={{
                    padding: 24,
                    fontFamily: "system-ui, -apple-system",
                    maxWidth: 1120,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 18,
                        padding: 24,
                        background: "#fff",
                        color: "#666",
                    }}
                >
                    読み込み中…
                </div>
            </main>
        );
    }

    if (errorText) {
        return (
            <main
                style={{
                    padding: 24,
                    fontFamily: "system-ui, -apple-system",
                    maxWidth: 1040,
                    margin: "0 auto",
                }}
            >
                <button
                    onClick={() => window.history.back()} style={{ color: "#111", textDecoration: "none" }}>
                    ← 一覧へ
                </button>

                <div
                    style={{
                        marginTop: 16,
                        border: "1px solid #fecaca",
                        borderRadius: 18,
                        padding: 24,
                        background: "#fff7f7",
                    }}
                >
                    <div style={{ color: "#b00020", fontWeight: 800, fontSize: 20 }}>エラー</div>
                    <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>API: {apiPath}</div>
                    <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "#7f1d1d" }}>{errorText}</pre>
                </div>
            </main>
        );
    }

    if (!facility) {
        return (
            <>
                <style>{`
                  @media (max-width: 900px) {
                    .detail-main {
                      padding: 16px !important;
                      max-width: 100% !important;
                      overflow-x: hidden !important;
                    }

                    .detail-hero-title {
                      font-size: 34px !important;
                    }

                    .detail-hero-lead {
                      margin-left: 0 !important;
                    }

                    .detail-card {
                      padding: 18px !important;
                    }

                    .detail-title {
                      font-size: 30px !important;
                    }

                    .detail-top-row {
                      display: block !important;
                    }

                    .detail-status-row {
                      margin-top: 16px !important;
                      justify-content: flex-start !important;
                      flex-wrap: wrap !important;
                    }

                    .detail-image-grid,
                    .detail-action-grid {
                      grid-template-columns: 1fr !important;
                    }

                    .detail-info-grid {
                      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                      gap: 10px !important;
                    }

                    .detail-info-grid > div {
                      padding: 12px !important;
                    }

                    .detail-ss-grid {
                      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    .detail-api-text {
                      display: none !important;
                    }
                  }
                `}</style>

                <main
                    className="detail-main"
                    style={{
                        padding: 24,
                        fontFamily: "system-ui, -apple-system",
                        maxWidth: 1040,
                        margin: "0 auto",
                    }}
                >
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            cursor: "pointer",
                            color: "#111",
                            fontWeight: 700,
                            fontSize: 15,
                        }}
                    >
                        ← 戻る
                    </button>

                    <div
                        style={{
                            marginTop: 16,
                            border: "1px solid #e5e7eb",
                            borderRadius: 18,
                            padding: 24,
                            background: "#fff",
                        }}
                    >
                        <div style={{ fontSize: 20, fontWeight: 800 }}>見つかりません</div>
                    </div>
                </main>
            </>
        );
    }

    const isTk = serviceKey === "tk";
    const acceptText = normalizeAcceptText(
        pick(facility.acceptTk, facility.accepttk, (facility as any).canAcceptNew)
    );
    const imageUrls = normalizeImages(
        normalizeImages(facility.images).length > 0
            ? facility.images
            : [
                (facility as any).image1Url,
                (facility as any).image2Url,
                (facility as any).image3Url,
                (facility as any).image1_url,
                (facility as any).image2_url,
                (facility as any).image3_url,
            ].filter(Boolean)
    );
    const ssAvailability = normalizeSsAvailability((facility as any).availability);
    const facilityDaySupport = displayOrUnknown(
        facility.daySupport,
        facility.daysupport,
        (facility as any).day_support
    );
    const selectedDisability = normalizeTagList(initialDisCsv);
    const displayDisability =
        selectedDisability.length > 0
            ? selectedDisability
            : normalizeTagList(
                pick(
                    facility.disabilityTags,
                    facility.failure,
                    facility.failureHd,
                    facility.hdDisability,
                    facility.failureJh,
                    facility.jhDisability,
                    facility.failureSss,
                    facility.ssDisability,
                    facility.disabilitiesSn,
                    facility.snDisability,
                    facility.failureJn,
                    facility.jnDisability
                )
            );
    const skDaySupport = displayOrUnknown(
        facility.daysupport,
        facility.daySupport,
        facility.day_support
    );

    const hdFailure = displayOrUnknown(
        facility.failureHd,
        facility.hdDisability,
        facility.hd_disability
    );

    const hdMedical = displayOrUnknown(
        facility.medicalCareHd,
        facility.medCareChild,
        facility.med_care_child
    );

    const jhFailure = displayOrUnknown(
        facility.failureJh,
        facility.jhDisability,
        facility.jh_disability
    );

    const jhMedical = displayOrUnknown(
        facility.medicalCareJh,
        facility.medCareChild,
        facility.med_care_child
    );

    const ssFailure = displayOrUnknown(
        facility.failureSss,
        facility.ssDisability,
        facility.ss_disability
    );

    const snFailure = displayOrUnknown(
        facility.disabilitiesSn,
        facility.snDisability,
        facility.sn_disability
    );

    const jnFailure = displayOrUnknown(
        facility.failureJn,
        facility.jnDisability,
        facility.jn_disability
    );

    return (
        <>
            <style>{`
              @media (max-width: 900px) {
                .detail-main {
                  padding: 16px !important;
                  max-width: 100% !important;
                  overflow-x: hidden !important;
                }

                .detail-hero-title {
                  font-size: 34px !important;
                }

                .detail-hero-lead {
                  margin-left: 0 !important;
                }

                .detail-card {
                  padding: 18px !important;
                }

                .detail-title {
                  font-size: 30px !important;
                }

                .detail-top-row {
                  display: block !important;
                }

                .detail-status-row {
                  margin-top: 16px !important;
                  justify-content: flex-start !important;
                  flex-wrap: wrap !important;
                }

                .detail-image-grid,
                .detail-action-grid {
                  grid-template-columns: 1fr !important;
                }

                .detail-ss-grid {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }

                .detail-info-grid {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  gap: 10px !important;
                }

                .detail-info-grid > div {
                  padding: 12px !important;
                }
              }
            `}</style>

            <main
                className="detail-main"
                style={{
                    padding: 24,
                    fontFamily: "system-ui, -apple-system",
                    maxWidth: 1040,
                    margin: "0 auto",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                    }}
                >
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            cursor: "pointer",
                            color: "#111",
                            fontWeight: 700,
                            fontSize: 15,
                        }}
                    >
                        ← 戻る
                    </button>

                    <Link
                        href="/jp/favorites"
                        style={{
                            color: "#111",
                            textDecoration: "none",
                            fontWeight: 700,
                            fontSize: 15,
                        }}
                    >
                        お気に入り
                    </Link>
                </div>

                <section
                    className="detail-card"
                    style={{
                        marginTop: 18,
                        border: "1px solid #e5e7eb",
                        borderRadius: 20,
                        padding: 24,
                        background: "#fff",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                    }}
                >
                    <div
                        className="detail-top-row"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 16,
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <h1
                                className="detail-title"
                                style={{
                                    margin: 0,
                                    fontSize: 38,
                                    lineHeight: 1.3,
                                    fontWeight: 800,
                                    color: "#111827",
                                }}
                            >
                                {facility.name}
                            </h1>

                            <div
                                style={{
                                    marginTop: 12,
                                    color: "#4b5563",
                                    fontSize: 17,
                                    lineHeight: 1.8,
                                }}
                            >
                                {facility.address ?? ""}
                            </div>
                        </div>

                        <div
                            className="detail-status-row"
                            style={{
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <FavoriteButton facilityId={`${serviceKey}:${facility.code ?? ""}`} size={28} />

                            {isTk ? (
                                <span style={badgeStyle(acceptText)}>新規引受：{acceptText}</span>
                            ) : (
                                <span style={badgeStyle(facility.vacant)}>
                                    空き：{facility.vacant ?? "不明"}
                                </span>
                            )}
                        </div>
                    </div>

                    {!isTk && facility.vacantDetail ? (
                        <div
                            style={{
                                marginTop: 18,
                                padding: 16,
                                borderRadius: 14,
                                background: "#f9fafb",
                                color: "#374151",
                                lineHeight: 1.8,
                            }}
                        >
                            {facility.vacantDetail}
                        </div>
                    ) : null}

                    {facility.vacantUpdatedAt ? (
                        <div style={{ marginTop: 14, color: "#6b7280", fontSize: 13 }}>
                            更新：{formatDateOnly(facility.vacantUpdatedAt)}
                        </div>
                    ) : null}

                    {serviceKey === "sk" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayDisability.join(" / ") || "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.shuttle ?? "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>入浴対応</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.bath, (facility as any).bathing, (facility as any).bath)}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                                    日中一時支援
                                </div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {skDaySupport}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "gh" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {normalizeCsvList(facility.failure).join(" / ") || "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設形態</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.facility ?? "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設種類</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.room ?? "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>性別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.sex ?? "不明"}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "ab" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.type ?? "不明"}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.shuttle ?? "不明"}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "hd" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害児種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {hdFailure}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>医療的ケア児</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {hdMedical}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>日中一時支援</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.daysupport, facility.daySupport, (facility as any).day_support)}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.shuttle, (facility as any).shuttle)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "jh" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害児種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {jhFailure}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>医療的ケア児</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {jhMedical}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.shuttle, (facility as any).shuttle)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "ss" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {ssFailure}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>日中一時支援</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.daysupport, facility.daySupport, (facility as any).day_support)}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>性別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {facility.sex ?? "不明"}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "sn" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>障害種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {snFailure}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.shuttle, (facility as any).shuttle)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "jn" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設種別</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {jnFailure}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>施設送迎</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.shuttle, (facility as any).shuttle)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {serviceKey === "tk" ? (
                        <div
                            className="detail-info-grid"
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            }}
                        >
                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>対象区分</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.targetsTk, (facility as any).targetstk, (facility as any).targetCategory)}
                                </div>
                            </div>

                            <div
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 14,
                                    padding: 16,
                                    background: "#fff",
                                }}
                            >
                                <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>新規受入</div>
                                <div style={{ color: "#374151", lineHeight: 1.8 }}>
                                    {displayOrUnknown(facility.acceptTk, (facility as any).accepttk, (facility as any).canAcceptNew)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {imageUrls.length > 0 ? (
                        <div style={{ marginTop: 18 }}>
                            <div style={{ fontWeight: 800, marginBottom: 10, color: "#111827" }}>施設写真</div>

                            <div
                                className="detail-image-grid"
                                style={{
                                    display: "grid",
                                    gap: 12,
                                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                }}
                            >
                                {imageUrls.map((src, index) => (
                                    <div
                                        key={`${src}-${index}`}
                                        style={{
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 16,
                                            overflow: "hidden",
                                            background: "#fff",
                                        }}
                                    >
                                        <img
                                            src={normalizeDriveImageUrl(src)}
                                            alt={`${facility.name ?? "施設"} の画像 ${index + 1}`}
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                height: 220,
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {facility.summary ? (
                        <div
                            style={{
                                marginTop: 18,
                                padding: 16,
                                borderRadius: 14,
                                background: "#f9fafb",
                                color: "#374151",
                                lineHeight: 1.8,
                            }}
                        >
                            <div style={{ fontWeight: 800, marginBottom: 8, color: "#111827" }}>概要</div>
                            <CollapsibleText text={facility.summary} />
                        </div>
                    ) : null}

                    {(facility.transit || facility.cost || facility.appeal) ? (
                        <div
                            style={{
                                marginTop: 18,
                                display: "grid",
                                gap: 12,
                                gridTemplateColumns: "1fr",
                            }}
                        >
                            {facility.transit ? (
                                <div
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 14,
                                        padding: 16,
                                        background: "#fff",
                                    }}
                                >
                                    <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>交通</div>
                                    <div style={{ color: "#374151", lineHeight: 1.8 }}>{facility.transit}</div>
                                </div>
                            ) : null}

                            {facility.cost ? (
                                <div
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 14,
                                        padding: 16,
                                        background: "#fff",
                                    }}
                                >
                                    <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>費用</div>
                                    <div style={{ color: "#374151", lineHeight: 1.8 }}>{facility.cost}</div>
                                </div>
                            ) : null}

                            {facility.appeal ? (
                                <div
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 14,
                                        padding: 16,
                                        background: "#fff",
                                    }}
                                >
                                    <div style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>特徴</div>
                                    <CollapsibleText text={facility.appeal} />
                                </div>
                            ) : null}
                            {serviceKey === "ss" && Array.isArray((facility as any).availability) && (facility as any).availability.length > 0 ? (
                                <div style={{ marginTop: 18 }}>
                                    <div style={{ fontWeight: 800, marginBottom: 10, color: "#111827" }}>
                                        3ヶ月先までの空き状況
                                    </div>

                                    <div
                                        style={{
                                            display: "grid",
                                            gap: 8,
                                            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                                        }}
                                    >
                                        {(facility as any).availability.map((d: any) => {
                                            const rooms = Number(d.rooms ?? 0);
                                            const hasRoom = rooms > 0;

                                            return (
                                                <div
                                                    key={d.date}
                                                    style={{
                                                        border: hasRoom ? "1px solid #86efac" : "1px solid #e5e7eb",
                                                        background: hasRoom ? "#f0fdf4" : "#ffffff",
                                                        color: hasRoom ? "#166534" : "#374151",
                                                        borderRadius: 10,
                                                        padding: 10,
                                                        minHeight: 64,
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    <div>{String(d.date ?? "")}</div>
                                                    <div style={{ marginTop: 6 }}>
                                                        {hasRoom ? `${rooms}枠あり` : "空きなし"}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </section>

                <section
                    style={{
                        marginTop: 18,
                        border: "1px solid #e5e7eb",
                        borderRadius: 20,
                        padding: 24,
                        background: "#fff",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                    }}
                >
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>お問い合わせ</div>

                    <div
                        className="detail-action-grid"
                        style={{
                            marginTop: 16,
                            display: "grid",
                            gap: 12,
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        }}
                    >
                        {String(facility.phoneNumber ?? "").trim() ? (
                            <a href={`tel:${String(facility.phoneNumber).trim()}`} style={actionButtonStyle("primary")}>
                                電話する
                            </a>
                        ) : null}

                        {String(facility.email ?? "").trim() ? (
                            <a href={`mailto:${String(facility.email).trim()}`} style={actionButtonStyle("secondary")}>
                                メールする
                            </a>
                        ) : null}

                        {facility.officialSiteUrl ? (
                            <a
                                href={facility.officialSiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={actionButtonStyle("secondary")}
                            >
                                公式サイト
                            </a>
                        ) : null}
                    </div>
                </section>
            </main>
        </>
    );
}