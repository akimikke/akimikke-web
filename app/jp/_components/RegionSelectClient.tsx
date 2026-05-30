"use client";

import { useMemo, useState } from "react";

type PrefItem = {
    pref: string;
    label: string;
    cities: string[];
};

export function RegionSelectClient({
    prefectures,
    initialPref,
    initialCity,
}: {
    prefectures: PrefItem[];
    initialPref: string;
    initialCity: string;
}) {
    const [selectedPref, setSelectedPref] = useState(initialPref);
    const [selectedCity, setSelectedCity] = useState(initialCity);

    const cities = useMemo(() => {
        return prefectures.find((p) => p.pref === selectedPref)?.cities ?? [];
    }, [prefectures, selectedPref]);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="area_pref" style={{ fontWeight: 700, color: "#111827" }}>
                    都道府県
                </label>

                <select
                    id="area_pref"
                    name="area_pref"
                    value={selectedPref}
                    onChange={(e) => {
                        setSelectedPref(e.target.value);
                        setSelectedCity("");
                    }}
                    style={selectStyle}
                >
                    <option value="">都道府県を選択</option>

                    {prefectures.map((p) => (
                        <option key={p.pref} value={p.pref}>
                            {p.label}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
                <label htmlFor="city" style={{ fontWeight: 700, color: "#111827" }}>
                    市区町村
                </label>

                <select
                    id="city"
                    name="city"
                    required
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">市区町村を選択</option>

                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

const selectStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 320,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    fontSize: 14,
};