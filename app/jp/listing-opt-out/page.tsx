"use client";

import { useState, type FormEvent } from "react";

// 既存のAkiMikke事業所登録フォーム
// 実際の公開URLを設定してください
const FACILITY_REGISTRATION_URL = "https://script.google.com/a/macros/aokoma.com/s/AKfycbwcZlJCGQKFwZwQX3plnX2T8VH4aGeANOPgHwBM9Tm2jUxZZHLAdHbxGzUzH97wCI3v3g/exec";

export default function ListingOptOutPage() {
  const [requestType, setRequestType] = useState("stop");
  const [facilityName, setFacilityName] = useState("");
  const [officeCode, setOfficeCode] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [requestDetail, setRequestDetail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting || success) return;

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/listing-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_type: requestType,
          facility_name: facilityName.trim(),
          office_code: officeCode.trim(),
          contact_name: contactName.trim(),
          contact_email: contactEmail.trim(),
          request_detail: requestDetail.trim(),
        }),
      });

      const result = await response.json();

      if (
        !response.ok ||
        result.ok !== true ||
        result.status !== "RECEIVED"
      ) {
        throw new Error(
          result.error || "申請を受け付けられませんでした"
        );
      }

      setSuccess(true);
      setMessage(
        "ご依頼を受け付けました。内容を確認のうえ、順次対応いたします。"
      );
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
        <a href="https://www.akimikke.com/" className="text-sm text-blue-600">
          ← ホームに戻る
        </a>

        <h1 className="mt-6 text-2xl font-bold">
          施設情報の掲載停止・修正依頼
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          AkiMikkeでは、公開されている障害福祉サービス情報を
          活用して施設情報を掲載しています。
          施設関係者様からの掲載停止・情報修正のご依頼を
          こちらで受け付けます。
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="requestType" className="block font-semibold">
              ご依頼内容
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
            >
              <option value="stop">掲載停止</option>
              <option value="correct">掲載情報の修正</option>
            </select>
          </div>

          {requestType === "correct" && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
              <h2 className="text-lg font-bold text-blue-900">
                掲載情報の修正について
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-700">
                AkiMikkeでは、すでに施設の基本情報を登録しています。
                掲載情報の修正をご希望の場合は、
                事業所登録フォームからお手続きください。
              </p>

              <p className="mt-3 text-sm font-semibold leading-7 text-blue-900">
                フォームを開いたら、必ず「情報更新」を選択してください。
              </p>

              <p className="mt-2 text-sm leading-7 text-gray-700">
                事業所番号を入力し、対象施設の情報を確認してから、
                修正内容をご入力ください。
              </p>

              {FACILITY_REGISTRATION_URL ? (
                <a
                  href={FACILITY_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block rounded bg-blue-600 p-3 text-center font-semibold text-white hover:bg-blue-700"
                >
                  事業所登録フォームを開く
                </a>
              ) : (
                <p className="mt-4 text-sm text-red-700">
                  現在、登録フォームへのリンクを準備しています。
                </p>
              )}
            </div>
          )}

          {requestType === "stop" && (
            <>

          <div>
            <label htmlFor="facilityName" className="block font-semibold">
              施設名
            </label>
            <input
              id="facilityName"
              type="text"
              required
              maxLength={200}
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
              placeholder="施設名を入力してください"
            />
          </div>

          <div>
            <label htmlFor="officeCode" className="block font-semibold">
              事業所番号
            </label>
            <input
              id="officeCode"
              type="text"
              maxLength={50}
              value={officeCode}
              onChange={(e) => setOfficeCode(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
              placeholder="事業所番号（分かる場合）"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block font-semibold">
              ご担当者名
            </label>
            <input
              id="contactName"
              type="text"
              required
              maxLength={100}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
              placeholder="お名前"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block font-semibold">
              連絡先メールアドレス
            </label>
            <input
              id="contactEmail"
              type="email"
              required
              maxLength={254}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="requestDetail" className="block font-semibold">
              ご依頼内容・補足
            </label>
            <textarea
              id="requestDetail"
              rows={4}
              maxLength={3000}
              value={requestDetail}
              onChange={(e) => setRequestDetail(e.target.value)}
              disabled={submitting || success}
              className="mt-2 w-full rounded border p-3"
              placeholder="修正内容や補足事項をご入力ください"
            />
          </div>

          {message && (
            <div
              role="status"
              className={`rounded p-4 text-sm ${
                success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || success}
            className={`w-full rounded p-3 font-semibold text-white ${
              submitting || success
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting
              ? "送信中..."
              : success
                ? "受付完了"
                : "依頼を送信する"}
          </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
