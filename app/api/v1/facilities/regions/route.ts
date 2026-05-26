// app/api/v1/facilities/regions/route.ts
import { getPool } from "@/app/lib/db";

function norm(v: any) {
  return String(v ?? "").trim();
}

function useDb() {
  return process.env.AKIMIKKE_USE_DB === "1";
}

function normalizePref(pref: string) {
  const p = norm(pref).toLowerCase();

  const map: Record<string, string> = {
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

  return map[p] ?? pref;
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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const service = norm(url.searchParams.get("service")).toLowerCase();
    const prefRaw = norm(url.searchParams.get("pref"));
    const prefecture = prefRaw && prefRaw !== "all" ? normalizePref(prefRaw) : "";

    if (!service) {
      return json({ ok: false, regions: [], error: "service is required" }, 400);
    }

    if (useDb()) {
      const pool = getPool();

      const params: any[] = [service];
      let where = `WHERE service_key = $1 AND region IS NOT NULL AND TRIM(region) <> ''`;

      if (prefecture) {
        params.push(prefecture);
        where += ` AND prefecture = $${params.length}`;
      }

      const res = await pool.query(
        `
        SELECT DISTINCT region
        FROM facilities
        ${where}
        ORDER BY region ASC
        `,
        params
      );

      return json({
        ok: true,
        regions: res.rows.map((r) => r.region).filter(Boolean),
      });
    }

    // =========================
    // GASモード
    // =========================
    const gasUrl = process.env.AKIMIKKE_APP_DATA_URL;

    if (!gasUrl) {
      return json(
        { ok: false, regions: [], error: "AKIMIKKE_APP_DATA_URL is not set" },
        500
      );
    }

    const upstream = `${gasUrl}?type=${encodeURIComponent(service)}`;

    const res = await fetch(upstream, { cache: "no-store" });

    if (!res.ok) {
      return json(
        { ok: false, regions: [], error: `Upstream HTTP ${res.status}` },
        502
      );
    }

    const data = await res.json();

    const facilities = Array.isArray(data)
      ? data
      : Array.isArray(data.facilities)
        ? data.facilities
        : [];

    let regions = Array.from(
      new Set(
        facilities
          .filter((f: any) => {
            if (!prefecture) return true;
            return norm(f.prefecture) === prefecture;
          })
          .map((f: any) => norm(f.region))
          .filter(Boolean)
      )
    );

    regions = regions.sort((a, b) => String(a).localeCompare(String(b), "ja"));

    return json({
      ok: true,
      mode: "gas",
      service,
      prefecture,
      regions,
      count: regions.length,
    });
  } catch (e: any) {
    return json({ ok: false, regions: [], error: e?.message ?? "Unknown error" }, 500);
  }
}