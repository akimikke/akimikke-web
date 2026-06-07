"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";

type Facility = {
    code?: string;
    name?: string;
    prefecture?: string;
    region?: string;
    address?: string;
    vacant?: string;
    availability?: {
        date: string;
        rooms: number;
        note?: string;
    }[];
    vacantUpdatedAt?: string;
    summary?: string;
    appeal?: string;
    images?: string[] | string;
    image1Url?: string;
    image2Url?: string;
    image3Url?: string;
    image1_url?: string;
    image2_url?: string;
    image3_url?: string;
    image1?: string;
    image2?: string;
    image3?: string;
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
    medicalCare?: string;
    medicalCareHd?: string;
    medicalCareJh?: string;
    failureJh?: string;
    failureSss?: string;
    disabilitiesSn?: string;
    failureJn?: string;
    acceptTk?: string;
    targetsTk?: string;
    serviceKey?: string;
    service_key?: string;
    serviceType?: string;
    service_type?: string;
    prefSlug?: string;
    pref_slug?: string;
};

type SearchResponse = {
    ok?: boolean;
    page?: number;
    per?: number;
    total?: number;
    count?: number;
    facilities?: Facility[];
};

function normalizeImages(raw: string[] | string | undefined): string[] {
    if (!raw) return [];

    if (Array.isArray(raw)) {
        return raw.map((x) => String(x).trim()).filter(Boolean);
    }

    const s = String(raw).trim();
    if (!s) return [];

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
const SERVICE_LABELS: Record<string, string> = {
    gh: "グループホーム",
    sk: "生活介護",
    ab: "就労継続A/B型",
    hd: "放課後等デイサービス",
    jh: "児童発達支援",
    ss: "ショートステイ",
    sn: "障害者支援施設",
    jn: "児童施設",
    tk: "計画相談支援",
    all: "全サービス",
};

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

function parseSelectedDisabilityFromApiPath(apiPath: string): string[] {
    const queryPart = apiPath.split("?")[1] ?? "";
    const qs = new URLSearchParams(queryPart);
    const dis = String(qs.get("dis") ?? "").trim();
    if (!dis) return [];
    return dis.split(",").map((x) => x.trim()).filter(Boolean);
}

function vacantBadgeStyle(vacant: string | undefined): React.CSSProperties {
    const v = String(vacant ?? "").trim();

    if (v === "あり") {
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 10px",
            borderRadius: 999,
            background: "#ecfdf5",
            color: "#047857",
            fontWeight: 800,
            fontSize: 13,
            border: "1px solid #a7f3d0",
        };
    }

    if (v === "なし") {
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 10px",
            borderRadius: 999,
            background: "#f9fafb",
            color: "#6b7280",
            fontWeight: 800,
            fontSize: 13,
            border: "1px solid #e5e7eb",
        };
    }

    return {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        background: "#eff6ff",
        color: "#1d4ed8",
        fontWeight: 800,
        fontSize: 13,
        border: "1px solid #bfdbfe",
    };
}

function optionBadgeStyle(value: string | undefined): React.CSSProperties {
    const v = String(value ?? "").trim();

    if (v === "あり") {
        return {
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: 999,
            background: "#eff6ff",
            color: "#1d4ed8",
            border: "1px solid #bfdbfe",
            fontWeight: 700,
            fontSize: 12,
        };
    }

    return {
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 8px",
        borderRadius: 999,
        background: "#f9fafb",
        color: "#6b7280",
        border: "1px solid #e5e7eb",
        fontWeight: 700,
        fontSize: 12,
    };
}

function pageButtonStyle(active: boolean): React.CSSProperties {
    return {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        height: 40,
        padding: "0 12px",
        borderRadius: 10,
        border: active ? "1px solid #111827" : "1px solid #d1d5db",
        background: active ? "#111827" : "#ffffff",
        color: active ? "#ffffff" : "#111827",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 14,
    };
}

function renderServiceBadges(serviceKey: string, f: Facility, selectedDisability: string[]) {
    const badges: { label: string; value: string; highlight?: boolean }[] = [];

    if (serviceKey === "gh") {
        badges.push(
            { label: "障害種別", value: normalizeCsvList(f.failure).join(" / ") },
            { label: "施設形態", value: f.facility ?? "" },
            { label: "施設種類", value: f.room ?? "" },
            { label: "性別", value: f.sex ?? "" }
        );
    }

    if (serviceKey === "sk") {
        badges.push(
            {
                label: "障害種別",
                value:
                    selectedDisability.length > 0
                        ? selectedDisability.join(" / ")
                        : normalizeTagList(f.disabilityTags).join(" / "),
            },
            { label: "送迎", value: f.shuttle ?? "" },
            { label: "入浴", value: displayOrUnknown(f.bath, (f as any).bathing) },
            { label: "日中一時支援", value: displayOrUnknown(f.daysupport, (f as any).daySupport, (f as any).day_support) }
        );
    }

    if (serviceKey === "ab") {
        badges.push(
            { label: "種別", value: f.type ?? "" },
            { label: "送迎", value: f.shuttle ?? "" }
        );
    }

    if (serviceKey === "hd") {
        badges.push(
            { label: "障害児種別", value: displayOrUnknown(f.failureHd, (f as any).hdDisability, (f as any).hd_disability) },
            { label: "医療的ケア児", value: displayOrUnknown(f.medicalCareHd, (f as any).medCareChild, (f as any).med_care_child) },
            { label: "日中一時支援", value: displayOrUnknown(f.daysupport, (f as any).daySupport, (f as any).day_support) },
            { label: "送迎", value: f.shuttle ?? "" }
        );
    }

    if (serviceKey === "jh") {
        badges.push(
            { label: "障害児種別", value: displayOrUnknown(f.failureJh, (f as any).jhDisability, (f as any).jh_disability) },
            { label: "医療的ケア児", value: displayOrUnknown(f.medicalCareJh, (f as any).medCareChild, (f as any).med_care_child) },
            { label: "送迎", value: f.shuttle ?? "" }
        );
    }

    if (serviceKey === "ss") {
        const hasSsAvailability =
            Array.isArray(f.availability) &&
            f.availability.some((d) => Number(d.rooms ?? 0) > 0);

        badges.push(
            { label: "3ヶ月空き", value: hasSsAvailability ? "あり" : "なし", highlight: hasSsAvailability },
            { label: "障害種別", value: displayOrUnknown(f.failureSss, (f as any).ssDisability, (f as any).ss_disability) },
            { label: "日中一時支援", value: displayOrUnknown(f.daysupport, (f as any).daySupport, (f as any).day_support) },
            { label: "性別", value: f.sex ?? "" }
        );
    }

    if (serviceKey === "sn") {
        badges.push(
            { label: "障害種別", value: displayOrUnknown(f.disabilitiesSn, (f as any).snDisability, (f as any).sn_disability) },
            { label: "送迎", value: f.shuttle ?? "" }
        );
    }

    if (serviceKey === "jn") {
        badges.push(
            { label: "施設種別", value: displayOrUnknown(f.failureJn, (f as any).jnDisability, (f as any).jn_disability) },
            { label: "送迎", value: f.shuttle ?? "" }
        );
    }

    if (serviceKey === "tk") {
        badges.push(
            { label: "対象区分", value: displayOrUnknown(f.targetsTk, (f as any).targetstk, (f as any).targetCategory) },
            { label: "新規受入", value: f.acceptTk ?? "" }
        );
    }

    return badges.filter((b) => b.value && b.value !== "不明");
}

export function FacilityListClient(props: {
    apiPath: string;
    prefSlug: string;
    serviceKey: string;
}) {
    const { apiPath, prefSlug, serviceKey } = props;
    const selectedDisability = useMemo(() => {
        return parseSelectedDisabilityFromApiPath(apiPath);
    }, [apiPath]);

    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [page, setPage] = useState(1);
    const [per, setPer] = useState(30);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setLoading(true);
            setErrorText(null);

            try {
                const res = await fetch(apiPath, { cache: "no-store" });
                if (!res.ok) {
                    const t = await res.text();
                    throw new Error(t || `HTTP ${res.status}`);
                }

                const data = (await res.json()) as SearchResponse;
                const list = Array.isArray(data?.facilities) ? data.facilities : [];

                if (!cancelled) {
                    setFacilities(list);
                    setPage(Number(data?.page ?? 1));
                    setPer(Number(data?.per ?? 30));
                    setTotal(Number(data?.total ?? list.length));
                }
            } catch (e: any) {
                if (!cancelled) {
                    setErrorText(String(e?.message ?? e));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [apiPath]);

    const listHeaderStyle: React.CSSProperties = {
        marginBottom: 22,
        padding: "18px 20px",
        borderRadius: 20,
        background: "linear-gradient(135deg, #e0f2fe 0%, #ffffff 58%, #ecfdf5 100%)",
        border: "1px solid #dbeafe",
    };

    const listLogoLinkStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        color: "inherit",
    };

    const listLogoImageStyle: React.CSSProperties = {
        width: 42,
        height: 42,
        objectFit: "contain",
    };

    const listLogoTitleStyle: React.CSSProperties = {
        fontSize: 28,
        fontWeight: 900,
        color: "#0f172a",
    };

    const totalPages = useMemo(() => {
        if (!per || per <= 0) return 1;
        return Math.max(1, Math.ceil(total / per));
    }, [total, per]);

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (page <= 4) {
            return [1, 2, 3, 4, 5, -1, totalPages];
        }

        if (page >= totalPages - 3) {
            return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, -1, page - 1, page, page + 1, -1, totalPages];
    }, [page, totalPages]);

    function buildPageHref(nextPage: number) {
        const queryPart = apiPath.split("?")[1] ?? "";
        const qs = new URLSearchParams(queryPart);

        qs.delete("service");
        qs.delete("pref");

        if (nextPage <= 1) {
            qs.delete("page");
        } else {
            qs.set("page", String(nextPage));
        }

        return `/jp/${prefSlug}/${serviceKey}${qs.toString() ? `?${qs.toString()}` : ""}`;
    }

    if (loading) {
        return (
            <>
                <div
                    style={{
                        marginTop: 22,
                        border: "1px solid #e5e7eb",
                        borderRadius: 16,
                        padding: 20,
                        background: "#fff",
                        color: "#666",
                    }}>
                    読み込み中…
                </div>
            </>
        );
    }

    if (errorText) {
        return (
            <>
                <div
                    style={{
                        marginTop: 22,
                        border: "1px solid #fecaca",
                        borderRadius: 16,
                        padding: 20,
                        background: "#fff7f7",
                    }}>
                    <div style={{ color: "#b00020", fontWeight: 800, fontSize: 18 }}>API エラー</div>
                    <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>API: {apiPath}</div>
                    <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "#7f1d1d" }}>{errorText}</pre>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{`
              @media (max-width: 900px) {
                .facility-card-layout {
                  display: block !important;
                }

                .facility-card-image {
                  min-height: 220px !important;
                  height: 220px !important;
                }
              }
            `}</style>

            <div
                style={{
                    marginTop: 22,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>
                        検索結果
                    </div>

                    <div
                        style={{
                            marginTop: 10,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        <span
                            style={{
                                padding: "6px 10px",
                                borderRadius: 999,
                                background: "#eff6ff",
                                color: "#1d4ed8",
                                fontSize: 12,
                                fontWeight: 700,
                                border: "1px solid #bfdbfe",
                            }}
                        >
                            {prefSlug}
                        </span>

                        <span
                            style={{
                                padding: "6px 10px",
                                borderRadius: 999,
                                background: "#f0fdf4",
                                color: "#166534",
                                fontSize: 12,
                                fontWeight: 700,
                                border: "1px solid #86efac",
                            }}
                        >
                            {serviceKey.toUpperCase()}
                        </span>

                        {selectedDisability.map((d) => (
                            <span
                                key={d}
                                style={{
                                    padding: "6px 10px",
                                    borderRadius: 999,
                                    background: "#f9fafb",
                                    color: "#374151",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: 999,
                        background: "#f3f4f6",
                        color: "#374151",
                        fontWeight: 700,
                        fontSize: 14,
                    }}
                >
                    {total}件
                </div>
            </div>

            {facilities.length === 0 ? (
                <div
                    style={{
                        marginTop: 16,
                        border: "1px solid #e5e7eb",
                        borderRadius: 16,
                        padding: 24,
                        background: "#fff",
                    }}
                >
                    <div style={{ fontSize: 18, fontWeight: 800 }}>該当する施設がありません</div>
                    <div style={{ marginTop: 8, color: "#666", lineHeight: 1.7 }}>
                        条件を変更して再検索してください。
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
                        {facilities.map((f) => {
                            const code = String(f.code ?? "").trim();

                            const hasSsAvailability =
                                serviceKey === "ss" &&
                                Array.isArray(f.availability) &&
                                f.availability.some((d) => Number(d.rooms ?? 0) > 0);

                            const detailQs = new URLSearchParams();

                            if (selectedDisability.length > 0) {
                                detailQs.set("dis", selectedDisability.join(","));
                            }

                            const actualServiceKey = String(
                                f.serviceKey ??
                                (f as any).service_key ??
                                f.serviceType ??
                                (f as any).service_type ??
                                serviceKey
                            ).trim().toLowerCase();

                            const actualServiceLabel = SERVICE_LABELS[actualServiceKey] ?? actualServiceKey.toUpperCase();

                            const actualPrefSlug = String(
                                f.prefSlug ??
                                (f as any).pref_slug ??
                                prefSlug
                            ).trim();

                            const href = `/jp/${encodeURIComponent(actualPrefSlug)}/${encodeURIComponent(actualServiceKey)}/${encodeURIComponent(code)}${detailQs.toString() ? `?${detailQs.toString()}` : ""
                                }`;

                            return (
                                <Link
                                    key={code || f.name || href}
                                    href={href}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div
                                        style={{
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 20,
                                            overflow: "hidden",
                                            background: "#fff",
                                            boxShadow: "0 2px 10px rgba(15,23,42,0.05)",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <div
                                            className="facility-card-layout"
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "220px 1fr",
                                                gap: 0,
                                            }}
                                        >
                                            {/* 左：画像 */}
                                            <div
                                                className="facility-card-image"
                                                style={{
                                                    position: "relative",
                                                    background: "#f3f4f6",
                                                    minHeight: 150,
                                                    height: 150,
                                                }}
                                            >
                                                {(() => {
                                                    const imageUrls = normalizeImages(f.images);

                                                    const fallbackImages = [
                                                        f.image1Url,
                                                        f.image2Url,
                                                        f.image3Url,
                                                        (f as any).image1_url,
                                                        (f as any).image2_url,
                                                        (f as any).image3_url,
                                                        (f as any).image1,
                                                        (f as any).image2,
                                                        (f as any).image3,
                                                    ].filter(Boolean) as string[];

                                                    const thumb = imageUrls[0] || fallbackImages[0];

                                                    return thumb ? (
                                                        <img
                                                            src={normalizeDriveImageUrl(thumb)}
                                                            alt={String(f.name ?? "施設画像")}
                                                            onError={(e) => {
                                                                e.currentTarget.src = "/akimikke-logo.png";
                                                                e.currentTarget.style.objectFit = "contain";
                                                                e.currentTarget.style.padding = "48px";
                                                                e.currentTarget.style.background = "#f8fafc";
                                                            }}
                                                            style={{
                                                                display: "block",
                                                                width: "100%",
                                                                height: "100%",
                                                                minHeight: 150,
                                                                objectFit: "contain",
                                                                background: "#f8fafc",
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                minHeight: 150,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                background: "#f8fafc",
                                                            }}
                                                        >
                                                            <img
                                                                src="/akimikke-logo.png"
                                                                alt="AkiMikke"
                                                                style={{
                                                                    width: 96,
                                                                    height: 96,
                                                                    objectFit: "contain",
                                                                    background: "#f8fafc",
                                                                    opacity: 0.75,
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })()}

                                                {/* お気に入り */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 12,
                                                        right: 12,
                                                        background: "rgba(255,255,255,0.95)",
                                                        borderRadius: 999,
                                                        padding: 6,
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                    }}
                                                >
                                                    <FavoriteButton facilityId={`${actualServiceKey}:${code}`} />
                                                </div>
                                            </div>

                                            {/* 右：情報 */}
                                            <div
                                                style={{
                                                    padding: 20,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <div>
                                                    {/* 上段 */}
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            gap: 12,
                                                            alignItems: "flex-start",
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div
                                                                style={{
                                                                    display: "inline-flex",
                                                                    marginBottom: 8,
                                                                    padding: "5px 10px",
                                                                    borderRadius: 999,
                                                                    background: "#eef2ff",
                                                                    color: "#3730a3",
                                                                    border: "1px solid #c7d2fe",
                                                                    fontSize: 12,
                                                                    fontWeight: 800,
                                                                }}
                                                            >
                                                                {actualServiceLabel}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontSize: 28,
                                                                    fontWeight: 900,
                                                                    color: "#111827",
                                                                    lineHeight: 1.4,
                                                                }}
                                                            >
                                                                {f.name || "名称未設定"}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    marginTop: 8,
                                                                    color: "#4b5563",
                                                                    fontSize: 15,
                                                                    lineHeight: 1.8,
                                                                }}
                                                            >
                                                                {f.address ?? ""}
                                                            </div>
                                                        </div>

                                                        {/* 空き */}
                                                        <div>
                                                            {serviceKey === "tk" ? (
                                                                <span
                                                                    style={vacantBadgeStyle(
                                                                        f.acceptTk === "できる" ? "あり" : "不明"
                                                                    )}
                                                                >
                                                                    新規受入：{f.acceptTk ?? "不明"}
                                                                </span>
                                                            ) : (
                                                                <span style={vacantBadgeStyle(f.vacant)}>
                                                                    空き：{f.vacant ?? "不明"}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* 概要 */}
                                                    {f.summary ? (
                                                        <div
                                                            style={{
                                                                marginTop: 14,
                                                                color: "#374151",
                                                                lineHeight: 1.8,
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical" as any,
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            {f.summary}
                                                        </div>
                                                    ) : null}

                                                    {/* タグ */}
                                                    <div
                                                        style={{
                                                            marginTop: 16,
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 8,
                                                        }}
                                                    >
                                                        {renderServiceBadges(actualServiceKey, f, selectedDisability).map((badge) => (
                                                            <span
                                                                key={`${badge.label}:${badge.value}`}
                                                                style={
                                                                    badge.highlight
                                                                        ? {
                                                                            display: "inline-flex",
                                                                            alignItems: "center",
                                                                            padding: "4px 8px",
                                                                            borderRadius: 999,
                                                                            background: "#f0fdf4",
                                                                            color: "#166534",
                                                                            border: "1px solid #86efac",
                                                                            fontWeight: 800,
                                                                            fontSize: 12,
                                                                        }
                                                                        : optionBadgeStyle(badge.value)
                                                                }
                                                            >
                                                                {badge.label} {badge.value}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* 下段 */}
                                                <div
                                                    style={{
                                                        marginTop: 20,
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            color: "#6b7280",
                                                            fontSize: 13,
                                                        }}
                                                    >
                                                        {f.vacantUpdatedAt
                                                            ? `更新：${String(f.vacantUpdatedAt)}`
                                                            : ""}
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            padding: "12px 18px",
                                                            borderRadius: 12,
                                                            background: "#2563eb",
                                                            color: "#fff",
                                                            fontWeight: 800,
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        詳細を見る →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {totalPages > 1 ? (
                        <div
                            style={{
                                marginTop: 22,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                flexWrap: "wrap",
                            }}
                        >
                            {page > 1 ? (
                                <Link href={buildPageHref(page - 1)} style={pageButtonStyle(false)}>
                                    ← 前へ
                                </Link>
                            ) : (
                                <span
                                    style={{
                                        ...pageButtonStyle(false),
                                        opacity: 0.45,
                                        pointerEvents: "none",
                                    }}
                                >
                                    ← 前へ
                                </span>
                            )}

                            {pageNumbers.map((n, index) =>
                                n === -1 ? (
                                    <span key={`ellipsis-${index}`} style={{ padding: "0 6px", color: "#6b7280" }}>
                                        …
                                    </span>
                                ) : (
                                    <Link
                                        key={n}
                                        href={buildPageHref(n)}
                                        style={pageButtonStyle(page === n)}
                                    >
                                        {n}
                                    </Link>
                                )
                            )}

                            {page < totalPages ? (
                                <Link href={buildPageHref(page + 1)} style={pageButtonStyle(false)}>
                                    次へ →
                                </Link>
                            ) : (
                                <span
                                    style={{
                                        ...pageButtonStyle(false),
                                        opacity: 0.45,
                                        pointerEvents: "none",
                                    }}
                                >
                                    次へ →
                                </span>
                            )}
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
}