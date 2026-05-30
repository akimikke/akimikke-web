"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "./favorites";
import { useRouter } from "next/navigation";

type FavoriteItem = {
    serviceKey: string;
    code: string;
};

type FacilitySummary = {
    serviceKey: string;
    code: string;
    name?: string;
    prefecture?: string;
    region?: string;
    address?: string;
    vacant?: string;
    acceptTk?: string;
};

function parseFavoriteId(id: string): FavoriteItem | null {
    const [serviceKey, code] = String(id).split(":");
    if (!serviceKey || !code) return null;
    return { serviceKey, code };
}

function serviceLabel(serviceKey?: string) {
    if (!serviceKey) return "不明";

    switch (serviceKey) {
        case "sk":
            return "生活介護";
        case "gh":
            return "グループホーム";
        case "ab":
            return "就労継続A型/B型";
        case "hd":
            return "放課後等デイサービス";
        case "jh":
            return "児童発達支援";
        case "ss":
            return "ショートステイ/日中一時支援";
        case "sn":
            return "障害者支援施設(入所)";
        case "jn":
            return "児童施設(入所)";
        case "tk":
            return "計画相談支援";
        default:
            return serviceKey.toUpperCase();
    }
}

export function FavoriteFacilitiesClient() {
    const router = useRouter();

    const [items, setItems] = useState<FavoriteItem[]>([]);
    const [facilities, setFacilities] = useState<FacilitySummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const parsed = (await getFavorites())
                .map(parseFavoriteId)
                .filter(Boolean) as FavoriteItem[];

            setItems(parsed);

            const results = await Promise.all(
                parsed.map(async (item) => {
                    try {
                        const qs = new URLSearchParams({
                            service: item.serviceKey,
                            pref: "kanagawa",
                            code: item.code,
                        });

                        const res = await fetch(`/api/v1/facilities/detail?${qs.toString()}`, {
                            cache: "no-store",
                        });

                        const json = await res.json().catch(() => null);
                        if (!res.ok || !json?.facility) return null;

                        return {
                            ...json.facility,
                            serviceKey: item.serviceKey,
                            code: item.code,
                        } as FacilitySummary;
                    } catch {
                        return null;
                    }
                })
            );

            setFacilities(results.filter(Boolean) as FacilitySummary[]);
            setLoading(false);
        };

        load();
        window.addEventListener("favorites-changed", load);
        return () => window.removeEventListener("favorites-changed", load);
    }, []);

    return (
        <>
            <style>{`
              @media (max-width: 900px) {
                .favorites-main {
                  padding: 16px !important;
                  max-width: 100% !important;
                  overflow-x: hidden !important;
                }

                .favorites-title {
                  font-size: 30px !important;
                }

                .favorite-card-row {
                  display: block !important;
                }

                .favorite-card-status {
                  margin-top: 14px !important;
                  align-items: flex-start !important;
                }

                .favorite-card {
                  padding: 16px !important;
                }
              }
            `}</style>

            <main
                className="favorites-main"
                style={{
                    padding: 24,
                    fontFamily: "system-ui, -apple-system",
                    maxWidth: 980,
                    margin: "0 auto",
                }}
            >
                <button
                    onClick={() => {
                        if (window.history.length > 1) {
                            router.back();
                        } else {
                            router.push("/"); // fallback
                        }
                    }}
                    style={{
                        color: "#111",
                        textDecoration: "none",
                        fontWeight: 700,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                >
                    ← 戻る
                </button>

                <div style={{ marginBottom: 24 }}>
                    <h1
                        style={{
                            fontSize: 36,
                            fontWeight: 900,
                            color: "#0f172a",
                            marginBottom: 10,
                        }}
                    >
                        お気に入り
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            lineHeight: 1.8,
                            fontSize: 15,
                        }}
                    >
                        保存した施設を一覧で確認できます。
                        気になる施設の空き状況を比較したり、
                        詳細ページへすぐ移動できます。
                    </p>
                </div>

                {loading ? (
                    <div
                        style={{
                            marginTop: 18,
                            border: "1px solid #e5e7eb",
                            borderRadius: 18,
                            padding: 24,
                            background: "#fff",
                        }}
                    >
                        読み込み中…
                    </div>
                ) : facilities.length === 0 ? (
                    <div
                        style={{
                            marginTop: 18,
                            border: "1px solid #e5e7eb",
                            borderRadius: 18,
                            padding: 24,
                            background: "#fff",
                        }}
                    >
                        まだお気に入りはありません。
                    </div>
                ) : (
                    <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
                        {facilities.map((f) => (
                            <div
                                className="favorite-card"
                                key={`${f.serviceKey}:${f.code}`}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 20,
                                    padding: 20,
                                    background: "#fff",
                                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                                }}
                            >
                                <div
                                    className="favorite-card-row"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 16,
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ color: "#2563eb", fontSize: 13, fontWeight: 800 }}>
                                            {serviceLabel(f.serviceKey)}
                                        </div>

                                        <h2
                                            style={{
                                                margin: "6px 0 0",
                                                fontWeight: 900,
                                                fontSize: 22,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {f.name ?? f.code}
                                        </h2>

                                        <p style={{ marginTop: 8, color: "#64748b", fontSize: 14 }}>
                                            {f.address ?? ""}
                                        </p>
                                    </div>

                                    <div
                                        className="favorite-card-status"
                                        style={{
                                            flexShrink: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-end",
                                            gap: 8,
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                padding: "7px 12px",
                                                borderRadius: 999,
                                                background: "#ecfdf5",
                                                color: "#047857",
                                                border: "1px solid #a7f3d0",
                                                fontWeight: 900,
                                                fontSize: 13,
                                            }}
                                        >
                                            {f.serviceKey === "tk"
                                                ? `新規引受：${f.acceptTk ?? "不明"}`
                                                : `空き：${f.vacant ?? "不明"}`}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                const id = `${f.serviceKey}:${f.code}`;
                                                removeFavorite(id);

                                                setFacilities((prev) =>
                                                    prev.filter((x) => `${x.serviceKey}:${x.code}` !== id)
                                                );
                                            }}
                                            style={{
                                                border: "1px solid #fecaca",
                                                background: "#fff1f2",
                                                color: "#be123c",
                                                borderRadius: 999,
                                                padding: "7px 12px",
                                                fontSize: 13,
                                                fontWeight: 800,
                                                cursor: "pointer",
                                            }}
                                        >
                                            ♡ 解除
                                        </button>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        marginTop: 16,
                                        display: "flex",
                                        gap: 10,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Link
                                        href={`/jp/kanagawa/${f.serviceKey}/${encodeURIComponent(f.code ?? "")}`}
                                        style={{
                                            padding: "10px 14px",
                                            borderRadius: 12,
                                            background: "#2563eb",
                                            color: "#fff",
                                            fontWeight: 900,
                                            textDecoration: "none",
                                            fontSize: 14,
                                        }}
                                    >
                                        詳細ページを開く →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main >
        </>
    );
}