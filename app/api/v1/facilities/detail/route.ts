// app/api/v1/facilities/detail/route.ts
import { NextResponse } from "next/server";
import { getPool } from "@/app/lib/db";

export const dynamic = "force-dynamic";

function norm(v: any) {
  return String(v ?? "").trim();
}

function useDb() {
  return process.env.AKIMIKKE_USE_DB === "1";
}

function normalizePref(pref: string) {
  const p = norm(pref).toLowerCase();
  if (!p) return "";
  if (p === "kanagawa") return "神奈川県";
  return pref;
}

function normalizeCode(v: any) {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\-\s]/g, "");
}

function getAny(obj: any, ...keys: string[]) {
  if (!obj) return "";

  for (const key of keys) {
    const v = obj[key];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return v;
    }
  }

  const lowerMap = new Map<string, any>();
  for (const k of Object.keys(obj)) {
    lowerMap.set(k.toLowerCase(), obj[k]);
  }

  for (const key of keys) {
    const v = lowerMap.get(key.toLowerCase());
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return v;
    }
  }

  return "";
}

function normalizeFacility(raw: any) {
  const images = Array.isArray(raw?.images)
    ? raw.images
    : [
      getAny(raw, "image1Url", "image1_url"),
      getAny(raw, "image2Url", "image2_url"),
      getAny(raw, "image3Url", "image3_url"),
    ].filter(Boolean);

  return {
    ...raw,

    code: getAny(raw, "code", "facility_code"),
    name: getAny(raw, "name", "facility_name"),

    email: getAny(raw, "email"),
    phoneNumber: getAny(raw, "phoneNumber", "phone_number", "phone"),

    vacant: getAny(raw, "vacant"),
    vacantDetail: getAny(raw, "vacantDetail", "vacant_detail"),
    vacantUpdatedAt: getAny(
      raw,
      "vacantUpdatedAt",
      "vacant_updated_at",
      "vacant_updated",
      "vacancyUpdatedAt",
      "vacancy_updated_at",
      "updatedAt",
      "updated_at"
    ),

    officialSiteUrl: getAny(raw, "officialSiteUrl", "official_site_url", "webUrl"),

    images,

    disabilityTags: getAny(raw, "disabilityTags", "disability_tags", "failure"),

    bath: getAny(raw, "bath", "bathing"),
    bathing: getAny(raw, "bathing", "bath"),

    daysupport: getAny(raw, "daysupport", "daySupport", "day_support"),
    daySupport: getAny(raw, "daySupport", "daysupport", "day_support"),
    day_support: getAny(raw, "day_support", "daySupport", "daysupport"),

    facility: getAny(raw, "facility", "facilityForm", "facility_form"),
    room: getAny(raw, "room", "roomType", "room_type"),
    sex: getAny(raw, "sex", "sexType", "sex_type"),

    type: getAny(raw, "type", "abType", "ab_type"),

    failureHd: getAny(raw, "failureHd", "failure_hd", "hdDisability", "hd_disability"),
    hdDisability: getAny(raw, "hdDisability", "failureHd", "failure_hd", "hd_disability"),

    medicalCareHd: getAny(raw, "medicalCareHd", "medical_care", "medicalCare", "medCareChild", "med_care_child"),
    medCareChild: getAny(raw, "medCareChild", "medicalCareHd", "medicalCareJh", "medical_care", "medicalCare", "med_care_child"),

    failureJh: getAny(raw, "failureJh", "failureJH", "failure_jh", "jhDisability", "jh_disability"),
    jhDisability: getAny(raw, "jhDisability", "failureJh", "failureJH", "failure_jh", "jh_disability"),

    medicalCareJh: getAny(raw, "medicalCareJh", "medicalCare", "medicalcare", "medical_care", "medCareChild", "med_care_child"),

    failureSss: getAny(raw, "failureSss", "failuresss", "failure_sss", "ssDisability", "ss_disability"),
    ssDisability: getAny(raw, "ssDisability", "failureSss", "failuresss", "failure_sss", "ss_disability"),

    disabilitiesSn: getAny(raw, "disabilitiesSn", "disabilitiesSN", "disabilitiessn", "disabilities_sn", "snDisability", "sn_disability"),
    snDisability: getAny(raw, "snDisability", "disabilitiesSn", "disabilitiesSN", "disabilitiessn", "disabilities_sn", "sn_disability"),

    failureJn: getAny(raw, "failureJn", "failureJN", "failurejn", "failure_jn", "jnDisability", "jn_disability"),
    jnDisability: getAny(raw, "jnDisability", "failureJn", "failureJN", "failurejn", "failure_jn", "jn_disability"),

    acceptTk: getAny(raw, "acceptTk", "accepttk", "canAcceptNew", "can_accept_new"),
    targetsTk: getAny(raw, "targetsTk", "targetstk", "targetCategory", "target_category"),
  };
}

function jsonUtf8(data: any, status = 200) {
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
    const { searchParams } = new URL(req.url);

    const service = norm(searchParams.get("service")).toLowerCase();
    const prefRaw = norm(searchParams.get("pref"));
    const pref = normalizePref(prefRaw);
    const code = norm(searchParams.get("code"));


    if (!service || !code) {
      return NextResponse.json(
        { ok: false, error: "service, code are required" },
        { status: 400 }
      );
    }

    if (useDb()) {
      const pool = getPool();

      const where: string[] = ["service_key = $1"];
      const params: any[] = [service];

      if (pref) {
        params.push(pref);
        where.push(`prefecture = $${params.length}`);
      }

      const sql = `
        SELECT
          service_key AS "serviceKey",
          code,
          name,
          prefecture,
          region,
          address,
          email,
          phone_number AS "phoneNumber",
          vacant,
          vacant_detail AS "vacantDetail",
          vacant_updated_at AS "vacantUpdatedAt",
          summary,
          transit,
          cost,
          appeal,
          official_site_url AS "officialSiteUrl",
          images,
          disability_tags AS "disabilityTags",
          shuttle,
          bath,
          daysupport,
          type,
          failure_hd AS "failureHd",
          medical_care AS "medicalCareHd",
          failurejh AS "failureJh",
          medicalcare AS "medicalCareJh",
          failuresss AS "failureSss",
          disabilitiessn AS "disabilitiesSn",
          failurejn AS "failureJn",
          accepttk AS "acceptTk",
          targetstk AS "targetsTk",
          failure,
          facility,
          room,
          sex
        FROM facilities
        WHERE ${where.join(" AND ")}
      `;

      const r = await pool.query(sql, params);

      const decodedCode = decodeURIComponent(code);
      const targetCode = normalizeCode(decodedCode);
      const hit = r.rows.find((row: any) => normalizeCode(row.code) === targetCode);

      if (!hit) {
        return NextResponse.json(
          { ok: false, error: "not found", debug: { mode: "db", code, targetCode } },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ok: true,
        facility: normalizeFacility(hit),
        debug: { mode: "db" },
      });
    }

    if (!prefRaw) {
      return NextResponse.json(
        { ok: false, error: "pref is required in GAS mode" },
        { status: 400 }
      );
    }

    const upstream = process.env.AKIMIKKE_APP_DATA_URL;
    if (!upstream) {
      return NextResponse.json(
        { ok: false, error: "AKIMIKKE_APP_DATA_URL is not set" },
        { status: 500 }
      );
    }

    const url = `${upstream}?type=${encodeURIComponent(
      service.toLowerCase()
    )}&pref=${encodeURIComponent(prefRaw)}`;

    const gasRes = await fetch(url, { cache: "no-store" });

    if (!gasRes.ok) {
      const text = await gasRes.text();
      return NextResponse.json(
        { ok: false, error: text || `HTTP ${gasRes.status}` },
        { status: 502 }
      );
    }

    const json = await gasRes.json().catch(() => null);

    const facilities = Array.isArray(json)
      ? json
      : Array.isArray(json?.facilities)
        ? json.facilities
        : [];

    const decodedCode = decodeURIComponent(code);
    const targetCode = normalizeCode(decodedCode);

    const hit = facilities.find((f: any) =>
      normalizeCode(f?.code ?? f?.facility_code) === targetCode
    );

    if (!hit) {
      return NextResponse.json(
        { ok: false, error: "not found", debug: { mode: "gas", code, targetCode, upstream: url } },
        { status: 404 }
      );
    }

    return jsonUtf8({
      ok: true,
      service: json?.service ?? service,
      serviceLabel: json?.serviceLabel ?? "",
      facility: normalizeFacility(hit),
      debug: { mode: "gas", upstream: url },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}