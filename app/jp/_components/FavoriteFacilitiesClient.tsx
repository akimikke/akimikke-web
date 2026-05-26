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

            const parsed = getFavorites()
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

                <h1 className="favorites-title" style={{ marginTop: 16, fontSize: 36, fontWeight: 800 }}>
                    お気に入り
                </h1>

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
                    <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                        {facilities.map((f) => (
                            <Link
                                className="favorite-card"
                                key={`${f.serviceKey}:${f.code}`}
                                href={`/jp/kanagawa/${f.serviceKey}/${encodeURIComponent(f.code ?? "")}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#111827",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 16,
                                    padding: 18,
                                    background: "#fff",
                                    display: "block",
                                }}
                            >
                                <div className="favorite-card-row" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 20 }}>
                                            {f.name ?? f.code}
                                        </div>
                                        <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>
                                            {serviceLabel(f.serviceKey)}
                                        </div>
                                        <div style={{ marginTop: 6, color: "#4b5563" }}>
                                            {f.address ?? ""}
                                        </div>
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
                                        {f.serviceKey === "tk" ? (
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    padding: "6px 10px",
                                                    borderRadius: 999,
                                                    background: "#ecfdf5",
                                                    color: "#047857",
                                                    border: "1px solid #a7f3d0",
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                }}
                                            >
                                                新規引受：{f.acceptTk ?? "不明"}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    padding: "6px 10px",
                                                    borderRadius: 999,
                                                    background: "#ecfdf5",
                                                    color: "#047857",
                                                    border: "1px solid #a7f3d0",
                                                    fontWeight: 800,
                                                    fontSize: 13,
                                                }}
                                            >
                                                空き：{f.vacant ?? "不明"}
                                            </span>
                                        )}
                                        {/* ★ここに追加 */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                const id = `${f.serviceKey}:${f.code}`;

                                                removeFavorite(id);

                                                setFacilities((prev) =>
                                                    prev.filter(
                                                        (x) => `${x.serviceKey}:${x.code}` !== id
                                                    )
                                                );
                                            }}
                                            style={{
                                                border: "1px solid #fecaca",
                                                background: "#fff1f2",
                                                color: "#be123c",
                                                borderRadius: 999,
                                                padding: "6px 10px",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                            }}
                                        >
                                            ♡解除
                                        </button>
                                    </div>
                                </div>

                                <div style={{ marginTop: 10, color: "#2563eb", fontWeight: 700 }}>
                                    詳細ページを開く →
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main >
        </>
    );
}