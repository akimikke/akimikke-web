// app/api/facilities/route.ts
import { NextResponse } from "next/server";

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

function normalizePref(pref: string) {
  const s = String(pref ?? "").trim();
  if (!s) return "";
  const slug = s.toLowerCase();
  return PREF_MAP[slug] ?? s; // slugなら日本語に寄せる。日本語が来てもそのまま。
}

/**
 * ★Safari等で /api を直接開いた時の文字化け対策：
 * Content-Type に charset=utf-8 を明示する
 */
function jsonUtf8(body: any, init?: { status?: number }) {
  const res = NextResponse.json(body, { status: init?.status ?? 200 });
  res.headers.set("Content-Type", "application/json; charset=utf-8");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const serviceRaw = searchParams.get("service") ?? "";
  const service = serviceRaw.toLowerCase().trim();

  const prefRaw = searchParams.get("pref") ?? "";
  const pref = normalizePref(prefRaw);

  const code = String(searchParams.get("code") ?? "").trim();

  console.log("DEBUG:", { serviceRaw, service, prefRaw, pref, code });

  if (!service) {
    return jsonUtf8(
      { error: true, message: "service を指定してください（例: ?service=sk）" },
      { status: 400 }
    );
  }

  if (!SERVICE_LABEL[service]) {
    return jsonUtf8(
      {
        error: true,
        message:
          "service パラメータが不正です（sk / gh / ab / hd / jh / ss / sn / jn / tk）",
        debug: { serviceRaw, service },
      },
      { status: 400 }
    );
  }

  const upstreamBase =
    process.env.AKIMIKKE_APP_DATA_URL ||
    process.env.NEXT_PUBLIC_AKIMIKKE_APP_DATA_URL;

  if (!upstreamBase) {
    return jsonUtf8({ error: true, message: "AKIMIKKE_APP_DATA_URL 未設定" }, { status: 500 });
  }

  const upstreamUrl = new URL(upstreamBase);
  upstreamUrl.searchParams.set("type", service.toLowerCase()); // upstreamは大文字想定

  try {
    const upstreamRes = await fetch(upstreamUrl.toString(), { cache: "no-store" });

    if (!upstreamRes.ok) {
      const text = await upstreamRes.text();
      return jsonUtf8(
        {
          error: true,
          message: text || `Upstream HTTP ${upstreamRes.status}`,
          debug: { upstreamUrl: upstreamUrl.toString() },
        },
        { status: 502 }
      );
    }

    const upstreamJson = await upstreamRes.json();
    const facilitiesRaw = Array.isArray(upstreamJson?.facilities) ? upstreamJson.facilities : [];

    const getAny = (obj: any, ...keys: string[]) => {
      for (const key of keys) {
        const v = obj?.[key];
        if (v !== undefined && v !== null && String(v).trim() !== "") return v;
      }

      const lowerMap = new Map<string, any>();
      for (const k of Object.keys(obj ?? {})) {
        lowerMap.set(k.toLowerCase(), obj[k]);
      }

      for (const key of keys) {
        const v = lowerMap.get(key.toLowerCase());
        if (v !== undefined && v !== null && String(v).trim() !== "") return v;
      }

      return "";
    };

    const facilities = facilitiesRaw.map((f: any) => ({
      ...f,
      code: getAny(f, "code", "facility_code"),
      name: getAny(f, "name", "facility_name"),
      phoneNumber: getAny(f, "phoneNumber", "phone_number", "phone"),
      vacantDetail: getAny(f, "vacantDetail", "vacant_detail"),
      vacantUpdatedAt: getAny(f, "vacantUpdatedAt", "vacant_updated_at"),
      officialSiteUrl: getAny(f, "officialSiteUrl", "official_site_url", "webUrl"),

      images: [
        getAny(f, "image1Url", "image1_url"),
        getAny(f, "image2Url", "image2_url"),
        getAny(f, "image3Url", "image3_url"),
      ].filter(Boolean),

      disabilityTags: getAny(f, "disabilityTags", "disability_tags", "failure"),

      bath: getAny(f, "bath", "bathing"),
      bathing: getAny(f, "bathing", "bath"),

      daysupport: getAny(f, "daysupport", "daySupport", "day_support"),
      daySupport: getAny(f, "daySupport", "daysupport", "day_support"),

      failureHd: getAny(f, "failureHd", "failure_hd"),
      medicalCareHd: getAny(f, "medicalCareHd", "medical_care"),

      failureJh: getAny(f, "failureJh", "failureJH", "failure_jh"),
      medicalCareJh: getAny(f, "medicalCareJh", "medicalCare", "medical_care"),

      failureSss: getAny(f, "failureSss", "failuresss"),
      disabilitiesSn: getAny(f, "disabilitiesSn", "disabilitiesSN"),
      failureJn: getAny(f, "failureJn", "failureJN"),

      acceptTk: getAny(f, "acceptTk", "accepttk"),
      targetsTk: getAny(f, "targetsTk", "targetstk"),
    }));

    const filtered = facilities.filter((f: any) => {
      if (pref) {
        if (String(f.prefecture ?? "").trim() !== pref) return false;
      }
      if (code) {
        if (String(f.code ?? "").trim() !== code) return false;
      }
      return true;
    });

    const rankVacant = (v: any) => {
      const s = String(v ?? "").trim();
      // 「あり」「空きあり」「◯」など表記揺れを許容
      if (s === "あり" || s === "空きあり" || s === "○" || s.toLowerCase() === "yes") return 0;
      if (s === "なし" || s === "空きなし" || s === "×" || s.toLowerCase() === "no") return 1;
      return 2; // 不明は最後
    };

    const toTime = (v: any) => {
      const t = Date.parse(String(v ?? ""));
      return Number.isFinite(t) ? t : 0;
    };

    filtered.sort((a: any, b: any) => {
      // 1) 空きあり優先
      const va = rankVacant(a?.vacant);
      const vb = rankVacant(b?.vacant);
      if (va !== vb) return va - vb;

      // 2) 更新が新しい順
      const ta = toTime(a?.vacantUpdatedAt);
      const tb = toTime(b?.vacantUpdatedAt);
      if (ta !== tb) return tb - ta;

      // 3) 名前で安定化
      const na = String(a?.name ?? "");
      const nb = String(b?.name ?? "");
      return na.localeCompare(nb, "ja");
    });

    return jsonUtf8({
      service,
      serviceLabel: SERVICE_LABEL[service],
      facilities: filtered,
      debug: {
        serviceRaw,
        service,
        prefRaw,
        pref,
        code,
        upstreamUrl: upstreamUrl.toString(),
        upstreamServiceValue: service.toUpperCase(),
        upstreamFirstPrefecture: String(facilitiesRaw?.[0]?.prefecture ?? ""),
      },
    });
  } catch (e: any) {
    return jsonUtf8({ error: true, message: e?.message ?? "fetch failed" }, { status: 500 });
  }
}