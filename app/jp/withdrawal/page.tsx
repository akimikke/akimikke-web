// app/jp/withdrawal/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退会・アカウント削除｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）の退会・アカウント削除手続きについての案内ページです。",
};

export default function WithdrawalPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← ホームへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>退会・アカウント削除について</h1>

        <p style={paragraphStyle}>
          AkiMikkeの会員登録を行っているお客様は、以下の方法で退会・アカウント削除を申請できます。
        </p>

        <h2 style={headingStyle}>退会・削除の方法</h2>
        <p style={paragraphStyle}>
          アカウント削除をご希望の場合は、登録メールアドレスから下記メールアドレス宛にご連絡ください。
        </p>

        <div style={boxStyle}>
          <p style={paragraphStyle}>
            宛先：customer@akimikke.com<br />
            件名：AkiMikkeアカウント削除依頼<br />
            本文：登録メールアドレス、削除希望の旨をご記載ください。
          </p>
        </div>

        <h2 style={headingStyle}>削除される情報</h2>
        <p style={paragraphStyle}>
          アカウント削除後、ログイン情報、プロフィール情報、その他当社が削除可能な会員情報を削除または停止します。
        </p>

        <h2 style={headingStyle}>ご注意</h2>
        <p style={paragraphStyle}>
          退会後は、会員向け機能を利用できなくなります。法令上保存が必要な情報や、不正利用防止・問い合わせ対応のために必要な情報は、一定期間保存する場合があります。
        </p>

        <h2 style={headingStyle}>お問い合わせ</h2>
        <p style={paragraphStyle}>
          退会・アカウント削除に関するお問い合わせは、AkiMikke運営事務局までご連絡ください。
        </p>

        <p style={dateStyle}>最終更新：2026年6月17日</p>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: 24,
  background: "#f8fafc",
  fontFamily: "system-ui, -apple-system",
};

const backStyle: React.CSSProperties = {
  display: "inline-flex",
  marginBottom: 16,
  color: "#111827",
  textDecoration: "none",
  fontWeight: 800,
};

const cardStyle: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  padding: 24,
  borderRadius: 20,
  background: "#fff",
  border: "1px solid #e5e7eb",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
};

const headingStyle: React.CSSProperties = {
  margin: "24px 0 8px",
  fontSize: 20,
  fontWeight: 900,
  color: "#111827",
};

const paragraphStyle: React.CSSProperties = {
  margin: "8px 0",
  color: "#374151",
  fontSize: 15,
  lineHeight: 1.9,
};

const boxStyle: React.CSSProperties = {
  marginTop: 12,
  padding: 18,
  borderRadius: 16,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const dateStyle: React.CSSProperties = {
  marginTop: 28,
  color: "#6b7280",
  fontSize: 14,
};