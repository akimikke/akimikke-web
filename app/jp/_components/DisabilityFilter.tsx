"use client";

import { useMemo, useState } from "react";

export function DisabilityFilter({
  initialDm,
  initialDisCsv,
  options,
  label = "障害種別",
}: {
  initialDm: "OR" | "AND";
  initialDisCsv: string;
  options: string[];
  label?: string;
}) {
  const initialSet = useMemo(() => {
    return new Set(
      String(initialDisCsv || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }, [initialDisCsv]);

  const [dm, setDm] = useState<"OR" | "AND">(initialDm);
  const [selectedSet, setSelectedSet] = useState<Set<string>>(initialSet);

  // URLに載せるCSVの順番は、そのサービスの options 順に固定
  const disCsv = useMemo(() => {
    return options.filter((d) => selectedSet.has(d)).join(",");
  }, [options, selectedSet]);

  const selectedCount = selectedSet.size;

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: 800, minWidth: 72 }}>{label}</div>

        <label
          style={{
            display: "inline-flex",
            gap: 6,
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            border: dm === "OR" ? "1px solid #93c5fd" : "1px solid #d1d5db",
            background: dm === "OR" ? "#eff6ff" : "#fff",
            color: "#111827",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <input
            type="radio"
            name="dm"
            value="OR"
            checked={dm === "OR"}
            onChange={() => setDm("OR")}
          />
          OR（いずれか）
        </label>

        <label
          style={{
            display: "inline-flex",
            gap: 6,
            alignItems: "center",
            padding: "8px 12px",
            borderRadius: 999,
            border: dm === "AND" ? "1px solid #93c5fd" : "1px solid #d1d5db",
            background: dm === "AND" ? "#eff6ff" : "#fff",
            color: "#111827",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <input
            type="radio"
            name="dm"
            value="AND"
            checked={dm === "AND"}
            onChange={() => setDm("AND")}
          />
          AND（すべて）
        </label>

        <div
          style={{
            marginLeft: "auto",
            color: "#6b7280",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {selectedCount > 0 ? `${selectedCount}件選択中` : "未選択"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {options.map((d) => {
          const checked = selectedSet.has(d);

          return (
            <label
              key={d}
              style={{
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 999,
                border: checked ? "1px solid #86efac" : "1px solid #d1d5db",
                background: checked ? "#f0fdf4" : "#fff",
                color: checked ? "#166534" : "#111827",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                  const next = new Set(selectedSet);
                  if (e.target.checked) {
                    next.add(d);
                  } else {
                    next.delete(d);
                  }
                  setSelectedSet(next);
                }}
              />
              {d}
            </label>
          );
        })}
      </div>

      {disCsv ? <input type="hidden" name="dis" value={disCsv} /> : null}
    </div>
  );
}