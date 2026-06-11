// app/api/v1/facilities/search/route.ts
import { getPool } from "@/app/lib/db";

type MatchMode = "OR" | "AND";

function norm(v: any) {
  return String(v ?? "").trim();
}
function parseCsvParam(v: string | null): string[] {
  const s = norm(v);
  if (!s) return [];
  return s.split(",").map((x) => norm(x)).filter(Boolean);
}
function parseBool01(v: string | null): boolean {
  return v === "1" || v?.toLowerCase() === "true";
}
function parseIntSafe(v: string | null, def: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : def;
}
function parseOrder(v: string | null) {
  const s = norm(v).toLowerCase();
  if (s === "name_asc") return "name_asc";
  if (s === "name_desc") return "name_desc";
  if (s === "updated_desc") return "updated_desc";
  if (s === "code_asc") return "code_asc";
  return "updated_desc";
}

function useDb() {
  return process.env.AKIMIKKE_USE_DB === "1";
}

function normalizePref(pref: string) {
  const p = norm(pref).toLowerCase();
  if (!p) return "";

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

function jsonUtf8(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getAny(obj: any, ...keys: string[]) {
  if (!obj) return "";

  const normalizeKey = (key: string) =>
    String(key ?? "")
      .trim()
      .toLowerCase()
      .replace(/[\s_\-]/g, "");

  const map = new Map<string, any>();

  for (const k of Object.keys(obj)) {
    map.set(normalizeKey(k), obj[k]);
  }

  for (const key of keys) {
    const v = map.get(normalizeKey(key));
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return v;
    }
  }

  return "";
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sp = url.searchParams;

    // ===== 基本 =====
    const service = norm(sp.get("service")).toLowerCase() || "all";
    const prefRaw = norm(sp.get("pref"));
    const areaPrefRaw = norm(sp.get("area_pref"));
    const prefecture = normalizePref(areaPrefRaw || prefRaw);
    const city = norm(sp.get("city"));
    const onlyVacant = parseBool01(sp.get("vacant"));
    const q = norm(sp.get("q"));

    // ===== 障害(OR/AND) =====（※DB側未対応なら一旦無視でもOK）
    const dmRaw = norm(sp.get("dm")).toUpperCase();
    const disabilityMatch: MatchMode = dmRaw === "AND" ? "AND" : "OR";
    const disabilitySelected = parseCsvParam(sp.get("dis"));

    // ===== ページング / 並び順 =====
    const page = parseIntSafe(sp.get("page"), 1);
    const per = Math.min(parseIntSafe(sp.get("per"), 30), 200);
    const order = parseOrder(sp.get("order"));

    // ===== dynFilters (f_ prefix) =====
    const dynFilters: Record<string, string[]> = {};
    const dynKeys: string[] = [];

    for (const key of Array.from(new Set(Array.from(sp.keys())))) {
      if (!key.startsWith("f_")) continue;

      const id = key.slice(2);

      const values = sp
        .getAll(key)
        .flatMap((v) => parseCsvParam(v))
        .map((v) => norm(v))
        .filter(Boolean);

      const uniqueValues = Array.from(new Set(values));

      if (uniqueValues.length > 0) {
        dynFilters[id] = uniqueValues;
        dynKeys.push(id);
      }
    }

    // =========================
    // ✅ DBモード
    // =========================
    if (useDb()) {
      const pool = getPool();

      // ORDER BY（おすすめ順）
      // 1) vacant='あり' 優先
      // 2) vacant_updated_at 新しい順
      // 3) name
      // 4) code
      let orderBy = `
        (CASE WHEN vacant = 'あり' THEN 1 ELSE 0 END) DESC,
        vacant_updated_at DESC NULLS LAST,
        name ASC,
        code ASC
     `;

      // tk は「空き」概念が違うので別の並びにする（例：更新→名前→コード）
      if (service === "tk") {
        orderBy = `
          vacant_updated_at DESC NULLS LAST,
          name ASC,
          code ASC
        `;
      }

      // もし UI から明示 order が来たら、それを優先（既存仕様維持）
      if (order === "name_asc") orderBy = `name ASC, code ASC`;
      if (order === "name_desc") orderBy = `name DESC, code ASC`;
      if (order === "code_asc") orderBy = `code ASC`;
      if (order === "updated_desc") orderBy = `vacant_updated_at DESC NULLS LAST, code ASC`;

      // WHERE句組み立て
      const where: string[] = [];
      const params: any[] = [];
      const add = (sql: string, ...vals: any[]) => {
        params.push(...vals);
        let i = params.length - vals.length + 1;
        const rewritten = sql.replace(/\?/g, () => `$${i++}`);
        where.push(rewritten);
      };

      // service_key（必須）
      if (service !== "all") {
        add(`LOWER(service_key) = ?`, service.toLowerCase());
      }

      // prefecture
      if (prefecture) add(`prefecture = ?`, prefecture);

      // city（region）
      if (city) add(`region = ?`, city);

      // vacant
      if (onlyVacant && service !== "tk") {
        add(`vacant = ?`, "あり");
      }

      // q（prefecture/region/address の部分一致）
      const qTokens = q
        .split(/\s+/)
        .map((x) => x.trim())
        .filter(Boolean);

      if (qTokens.length > 0) {
        for (const token of qTokens) {
          add(
            `(prefecture ILIKE ? OR region ILIKE ? OR address ILIKE ? OR name ILIKE ? OR summary ILIKE ?)`,
            `%${token}%`,
            `%${token}%`,
            `%${token}%`,
            `%${token}%`,
            `%${token}%`
          );
        }
      }

      // ===== 障害種別（本番向け：text[]）=====
      if (disabilitySelected.length > 0) {
        if (disabilityMatch === "AND") {
          // 全部含む
          add(`disability_tags @> ?::text[]`, disabilitySelected);
        } else {
          // どれか含む
          add(`disability_tags && ?::text[]`, disabilitySelected);
        }
      }

      // dynFilters（簡易）
      const allowedDynCols = new Set([
        // SK
        "shuttle",
        "bath",
        "daysupport",

        // GH
        "facility",
        "room",
        "sex",

        // AB
        "type",

        // HD
        "failure_hd",
        "medical_care",

        // JH
        "failurejh",
        "medicalcare",

        // SS
        "failuresss",

        // SN
        "disabilitiessn",

        // JN
        "failurejn",

        // TK
        "targetstk",
        "accepttk",
      ]);

      for (const [key, selected] of Object.entries(dynFilters)) {
        if (!selected?.length) continue;

        const col = key.replace(/[^a-zA-Z0-9_]/g, "");
        if (!col) continue;

        // SSの障害種別はカンマ区切り文字列なので部分一致で絞る
        if (col === "failuresss") {
          const likes = selected.map(() => `${col} ILIKE ?`).join(" OR ");
          add(`(${likes})`, ...selected.map((v) => `%${v}%`));
          continue;
        }

        // SNの障害種別もカンマ区切り文字列なので部分一致で絞る
        if (col === "disabilitiessn") {
          const likes = selected.map(() => `${col} ILIKE ?`).join(" OR ");
          add(`(${likes})`, ...selected.map((v) => `%${v}%`));
          continue;
        }

        // TK: 対象区分はカンマ区切り文字列なので部分一致で絞る
        if (col === "targetstk") {
          const likes = selected.map(() => `${col} ILIKE ?`).join(" OR ");
          add(`(${likes})`, ...selected.map((v) => `%${v}%`));
          continue;
        }



        const placeholders = selected.map(() => "?").join(",");
        add(`${col} IN (${placeholders})`, ...selected);
      }

      const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

      // total件数
      const totalRes = await pool.query(
        `SELECT COUNT(*)::int AS c FROM facilities ${whereSql}`,
        params
      );
      const total = totalRes.rows[0]?.c ?? 0;

      const offset = (page - 1) * per;

      // データ取得
      const dataRes = await pool.query(
        `
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
          appeal,
          images,
          image1_url AS "image1Url",
          image2_url AS "image2Url",
          image3_url AS "image3Url",

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
        ${whereSql}
        ORDER BY ${orderBy}
        LIMIT $${params.length + 1}
        OFFSET $${params.length + 2}
        `,
        [...params, per, offset]
      );

      const facilities = dataRes.rows ?? [];

      // ★★★ ここが重要：UTF-8ヘッダを確実に付ける ★★★
      const body = {
        ok: true,
        service,
        serviceLabel: "",
        page,
        per,
        total,
        count: facilities.length,
        order,
        facilities,
        facets: {},
        debug: {
          mode: "db",
          prefecture,
          city,
          onlyVacant,
          q,
          disabilityMatch,
          disabilitySelected,
          dynKeys,
        },
      };

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    // =========================
    // ✅ GASモード（現状のまま）
    // =========================
    const gasUrl = process.env.AKIMIKKE_APP_DATA_URL;
    if (!gasUrl) {
      return jsonUtf8(
        { ok: false, error: "AKIMIKKE_APP_DATA_URL is not set (.env.local)" },
        500
      );
    }

    const serviceKeys =
      service === "all"
        ? ["gh", "sk", "ab", "hd", "jh", "ss", "sn", "jn", "tk"]
        : [service.toLowerCase()];

    const prefForGas = areaPrefRaw || prefRaw || "";

    const upstreams = serviceKeys.map((serviceKey) => {
      return `${gasUrl}?type=${encodeURIComponent(serviceKey)}&pref=${encodeURIComponent(prefForGas)}`;
    });

    const gasResults = await Promise.all(
      upstreams.map(async (upstream) => {
        const res = await fetch(upstream, { cache: "no-store" });

        if (!res.ok) {
          return {
            upstream,
            ok: false,
            json: null,
          };
        }

        const json = await res.json().catch(() => null);

        return {
          upstream,
          ok: true,
          json,
        };
      })
    );

    const json = {
      service,
      serviceLabel: service === "all" ? "全サービス" : "",
      facilities: gasResults.flatMap((r) => {
        const j = r.json;

        const rows = Array.isArray(j)
          ? j
          : Array.isArray(j?.facilities)
            ? j.facilities
            : [];

        return rows.map((f: any) => ({
          ...f,
          serviceKey: getAny(f, "serviceKey", "service_key", "serviceType", "service_type") || "",

          prefSlug: normalizePref(
            getAny(f, "prefSlug", "pref_slug", "prefecture")
          ),
        }));
      }),
    };

    const facilitiesRaw = Array.isArray(json)
      ? json
      : Array.isArray(json.facilities)
        ? json.facilities
        : [];

    const facilities = facilitiesRaw.map((f: any) => ({
      ...f,

      code: getAny(f, "code", "facility_code"),
      name: getAny(f, "name", "facility_name"),

      phoneNumber: getAny(f, "phoneNumber", "phone_number", "phone"),
      vacantDetail: getAny(f, "vacantDetail", "vacant_detail"),
      vacantUpdatedAt: getAny(
        f,
        "vacantUpdatedAt",
        "vacant_updated_at",
        "vacant_updated",
        "vacancyUpdatedAt",
        "vacancy_updated_at",
        "updatedAt",
        "updated_at"
      ),
      officialSiteUrl: getAny(f, "officialSiteUrl", "official_site_url", "webUrl"),

      image1Url: getAny(f, "image1Url", "image1_url", "image1", "image_1_url"),
      image2Url: getAny(f, "image2Url", "image2_url", "image2", "image_2_url"),
      image3Url: getAny(f, "image3Url", "image3_url", "image3", "image_3_url"),

      images: [
        getAny(f, "image1Url", "image1_url", "image1", "image_1_url"),
        getAny(f, "image2Url", "image2_url", "image2", "image_2_url"),
        getAny(f, "image3Url", "image3_url", "image3", "image_3_url"),
      ].filter(Boolean),

      disabilityTags: getAny(f, "disabilityTags", "disability_tags", "failure"),

      bath: getAny(f, "bath", "bathing"),
      bathing: getAny(f, "bathing", "bath"),

      daySupport: getAny(
        f,
        "daySupport",
        "daysupport",
        "day_support",
        "day_support_status",
        "day_service",
        "dayService"
      ),

      daysupport: getAny(
        f,
        "daySupport",
        "daysupport",
        "day_support",
        "day_support_status",
        "day_service",
        "dayService"
      ),

      day_support: getAny(
        f,
        "daySupport",
        "daysupport",
        "day_support",
        "day_support_status",
        "day_service",
        "dayService"
      ),

      failure: getAny(f, "failure"),
      facility: getAny(f, "facility", "facility_form", "facilityForm"),
      room: getAny(f, "room", "room_type", "roomType"),
      sex: getAny(f, "sex", "sex_type", "sexType"),

      type: getAny(f, "type", "abType", "ab_type"),

      failureHd: getAny(f, "failureHd", "failure_hd", "hdDisability", "hd_disability"),
      medicalCareHd: getAny(f, "medicalCareHd", "medical_care", "medicalCare", "medCareChild", "med_care_child"),

      failureJh: getAny(f, "failureJh", "failureJH", "failure_jh", "jhDisability", "jh_disability"),
      medicalCareJh: getAny(f, "medicalCareJh", "medicalCare", "medicalcare", "medical_care", "medCareChild", "med_care_child"),

      failureSss: getAny(f, "failureSss", "failuresss", "failure_sss", "ssDisability", "ss_disability"),
      disabilitiesSn: getAny(f, "disabilitiesSn", "disabilitiesSN", "disabilitiessn", "snDisability", "sn_disability"),
      failureJn: getAny(f, "failureJn", "failureJN", "failurejn", "jnDisability", "jn_disability"),

      acceptTk: getAny(f, "acceptTk", "accepttk", "canAcceptNew", "can_accept_new"),
      targetsTk: getAny(f, "targetsTk", "targetstk", "targetCategory", "target_category"),
    }));

    let filtered = facilities;

    // 都道府県
    if (prefecture) {
      filtered = filtered.filter((f: any) => norm(f.prefecture) === prefecture);
    }

    // 市区町村
    if (city) {
      filtered = filtered.filter((f: any) => norm(f.region) === city);
    }

    // 空きありのみ
    if (onlyVacant && service !== "tk") {
      filtered = filtered.filter((f: any) => norm(f.vacant) === "あり");
    }

    // フリーワード
    // フリーワード
    if (q) {
      const qTokens = q
        .split(/\s+/)
        .map((x) => x.trim())
        .filter(Boolean);

      filtered = filtered.filter((f: any) => {
        const hay = `
          ${norm(f.name)}
          ${norm(f.facility_name)}
          ${norm(f.summary)}
          ${norm(f.prefecture)}
          ${norm(f.region)}
          ${norm(f.address)}
        `;

        return qTokens.every((token) => hay.includes(token));
      });
    }

    // ===== 追加条件 f_ フィルター（GASモード）=====
    for (const [key, selected] of Object.entries(dynFilters)) {
      if (!selected?.length) continue;

      filtered = filtered.filter((f: any) => {
        let value = "";

        if (key === "shuttle") {
          value = norm(f.shuttle);
        } else if (key === "bath") {
          value = norm(f.bath || f.bathing);
        } else if (key === "daysupport") {
          value = norm(f.daysupport || f.daySupport || f.day_support);
        } else if (key === "facility") {
          value = norm(f.facility);
        } else if (key === "room") {
          value = norm(f.room);
        } else if (key === "sex") {
          value = norm(f.sex);
        } else if (key === "type") {
          value = norm(f.type);
        } else if (key === "failure_hd") {
          value = norm(f.failureHd);
        } else if (key === "medical_care") {
          value = norm(f.medicalCareHd);
        } else if (key === "failurejh") {
          value = norm(f.failureJh);
        } else if (key === "medicalcare") {
          value = norm(f.medicalCareJh);
        } else if (key === "failuresss") {
          value = norm(f.failureSss);
        } else if (key === "disabilitiessn") {
          value = norm(f.disabilitiesSn);
        } else if (key === "failurejn") {
          value = norm(f.failureJn);
        } else if (key === "targetstk") {
          value = norm(f.targetsTk);
        } else if (key === "accepttk") {
          value = norm(f.acceptTk);
        }

        if (!value) return false;

        return selected.some((v) => value.includes(v));
      });
    }

    // GAS側も同様にUTF-8固定で返す
    return jsonUtf8({
      ok: true,
      service: json.service ?? service,
      serviceLabel: json.serviceLabel ?? "",
      page: 1,
      per: filtered.length,
      total: filtered.length,
      count: filtered.length,
      order: "updated_desc",
      facilities: filtered,
      facets: {},
      debug: { mode: "gas", upstreams, prefecture, city, onlyVacant, q },
    });
  } catch (e: any) {
    return jsonUtf8({ ok: false, error: e?.message ?? "Unknown error" }, 500);
  }
}