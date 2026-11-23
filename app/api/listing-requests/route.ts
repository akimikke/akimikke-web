import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 大きすぎるリクエストを拒否
    const raw = await request.text();

    if (raw.length > 10000) {
      return NextResponse.json(
        { ok: false, error: "入力内容が長すぎます" },
        { status: 413 }
      );
    }

    const body = JSON.parse(raw);

    const {
      request_type,
      facility_name,
      office_code,
      contact_name,
      contact_email,
      request_detail,
    } = body ?? {};

    // 既存の入力検証を維持
    if (
      !["stop", "correct"].includes(request_type) ||
      typeof facility_name !== "string" ||
      !facility_name.trim() ||
      typeof contact_name !== "string" ||
      !contact_name.trim() ||
      typeof contact_email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)
    ) {
      return NextResponse.json(
        { ok: false, error: "入力内容を確認してください" },
        { status: 400 }
      );
    }

    const gasUrl = process.env.LISTING_REQUEST_GAS_URL;
    const apiKey = process.env.LISTING_REQUEST_API_KEY;

    if (!gasUrl || !apiKey) {
      console.error("Listing request API configuration missing");

      return NextResponse.json(
        { ok: false, error: "現在、受付機能を準備しています" },
        { status: 503 }
      );
    }

    // 認証キーはサーバーからのみ送信
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        api_key: apiKey,
        request_type,
        facility_name: facility_name.trim(),
        office_code:
          typeof office_code === "string"
            ? office_code.trim()
            : "",
        contact_name: contact_name.trim(),
        contact_email: contact_email.trim(),
        request_detail:
          typeof request_detail === "string"
            ? request_detail.trim()
            : "",
      }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error("GAS returned HTTP " + response.status);
    }

    const result = await response.json();

    if (!result.ok || result.status !== "RECEIVED") {
      throw new Error("GAS did not accept the request");
    }

    return NextResponse.json({
      ok: true,
      request_id: result.request_id,
      status: "RECEIVED",
    });
  } catch (error) {
    console.error("Listing request API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "申請を受け付けられませんでした",
      },
      { status: 500 }
    );
  }
}
