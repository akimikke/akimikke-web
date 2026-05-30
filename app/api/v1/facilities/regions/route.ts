// app/api/v1/facilities/regions/route.ts
import { getPool } from "@/app/lib/db";

function norm(v: any) {
  return String(v ?? "").trim();
}

function useDb() {
  return process.env.AKIMIKKE_USE_DB === "1";
}

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

function normalizePref(pref: string) {
  const p = norm(pref).toLowerCase();
  return PREF_MAP[p] ?? pref;
}

function slugFromPrefName(prefecture: string) {
  const found = Object.entries(PREF_MAP).find(([, name]) => name === prefecture);
  return found?.[0] ?? prefecture;
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function buildPrefectures(facilities: any[]) {
  const map = new Map<string, Set<string>>();

  for (const f of facilities) {
    const prefecture = norm(f.prefecture);
    const region = norm(f.region);

    if (!prefecture || !region) continue;

    if (!map.has(prefecture)) {
      map.set(prefecture, new Set<string>());
    }

    map.get(prefecture)!.add(region);
  }

  return Array.from(map.entries())
    .map(([prefecture, cities]) => ({
      pref: slugFromPrefName(prefecture),
      label: prefecture,
      cities: Array.from(cities).sort((a, b) => a.localeCompare(b, "ja")),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "ja"));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const service = norm(url.searchParams.get("service")).toLowerCase();
    const prefRaw = norm(url.searchParams.get("pref"));
    const prefecture = prefRaw && prefRaw !== "all" ? normalizePref(prefRaw) : "";

    if (!service) {
      return json(
        { ok: false, regions: [], prefectures: [], error: "service is required" },
        400
      );
    }

    if (useDb()) {
      const pool = getPool();

      const res = await pool.query(
        `
        SELECT DISTINCT prefecture, region
        FROM facilities
        WHERE service_key = $1
          AND prefecture IS NOT NULL
          AND TRIM(prefecture) <> ''
          AND region IS NOT NULL
          AND TRIM(region) <> ''
        ORDER BY prefecture ASC, region ASC
        `,
        [service]
      );

      const facilities = res.rows;
      const prefectures = buildPrefectures(facilities);

      const regions = prefecture
        ? facilities
            .filter((f) => norm(f.prefecture) === prefecture)
            .map((f) => norm(f.region))
            .filter(Boolean)
            .filter((v, i, arr) => arr.indexOf(v) === i)
            .sort((a, b) => a.localeCompare(b, "ja"))
        : [];

      return json({
        ok: true,
        mode: "db",
        service,
        prefecture,
        prefectures,
        regions,
        count: regions.length,
      });
    }

    const gasUrl = process.env.AKIMIKKE_APP_DATA_URL;

    if (!gasUrl) {
      return json(
        {
          ok: false,
          regions: [],
          prefectures: [],
          error: "AKIMIKKE_APP_DATA_URL is not set",
        },
        500
      );
    }

    const upstream = `${gasUrl}?type=${encodeURIComponent(service)}`;
    const res = await fetch(upstream, { cache: "no-store" });

    if (!res.ok) {
      return json(
        {
          ok: false,
          regions: [],
          prefectures: [],
          error: `Upstream HTTP ${res.status}`,
        },
        502
      );
    }

    const data = await res.json();

    const facilities = Array.isArray(data)
      ? data
      : Array.isArray(data.facilities)
        ? data.facilities
        : [];

    const prefectures = buildPrefectures(facilities);

    const regions = prefecture
      ? Array.from(
          new Set(
            facilities
              .filter((f: any) => norm(f.prefecture) === prefecture)
              .map((f: any) => norm(f.region))
              .filter(Boolean)
          )
        ).sort((a, b) => String(a).localeCompare(String(b), "ja"))
      : [];

    return json({
      ok: true,
      mode: "gas",
      service,
      prefecture,
      prefectures,
      regions,
      count: regions.length,
    });
  } catch (e: any) {
    return json(
      {
        ok: false,
        regions: [],
        prefectures: [],
        error: e?.message ?? "Unknown error",
      },
      500
    );
  }
}