import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）へのお問い合わせページです。施設情報の修正依頼、不具合報告、掲載に関する相談などはこちらからご連絡ください。",
};

const inquiryEmail = "customer@akimikke.com";

export default function ContactPage() {
  const subject = encodeURIComponent("【AkiMikke】お問い合わせ");
  const body = encodeURIComponent(
    "お問い合わせ内容を入力してください。\n\n【お名前】\n【お問い合わせ種別】\n【内容】\n"
  );

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <Link href="/" style={backStyle}>← ホームへ戻る</Link>

        <h1 style={titleStyle}>お問い合わせ</h1>

        <p style={leadStyle}>
          AkiMikke（あきみっけ）に関するお問い合わせは、下記よりご連絡ください。
          施設情報の修正、不具合報告、掲載に関するご相談などを受け付けています。
        </p>

        <div style={boxStyle}>
          <h2 style={sectionTitleStyle}>お問い合わせ内容の例</h2>
          <ul style={listStyle}>
            <li>施設情報の修正・削除依頼</li>
            <li>空き状況や掲載内容に関するご連絡</li>
            <li>WEB版・アプリ版の不具合報告</li>
            <li>施設掲載に関するご相談</li>
            <li>個人情報・アカウントに関するお問い合わせ</li>
          </ul>
        </div>

        <div style={boxStyle}>
          <h2 style={sectionTitleStyle}>連絡先</h2>
          <p style={textStyle}>
            メールアドレス：{" "}
            <a href={`mailto:${inquiryEmail}?subject=${subject}&body=${body}`} style={linkStyle}>
              {inquiryEmail}
            </a>
          </p>
          <p style={noteStyle}>
            内容を確認のうえ、必要に応じて返信いたします。お問い合わせ内容によっては、回答までお時間をいただく場合があります。
          </p>
        </div>

        <a
          href={`mailto:${inquiryEmail}?subject=${subject}&body=${body}`}
          style={buttonStyle}
        >
          メールで問い合わせる
        </a>
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

const cardStyle: React.CSSProperties = {
  maxWidth: 860,
  margin: "0 auto",
  padding: 24,
  borderRadius: 24,
  background: "#fff",
  border: "1px solid #e5e7eb",
};

const backStyle: React.CSSProperties = {
  color: "#334155",
  textDecoration: "none",
  fontWeight: 700,
};

const titleStyle: React.CSSProperties = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 900,
  color: "#0f172a",
};

const leadStyle: React.CSSProperties = {
  marginTop: 12,
  color: "#475569",
  lineHeight: 1.9,
};

const boxStyle: React.CSSProperties = {
  marginTop: 24,
  padding: 18,
  borderRadius: 18,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 900,
  color: "#0f172a",
};

const listStyle: React.CSSProperties = {
  marginTop: 12,
  lineHeight: 1.9,
  color: "#334155",
};

const textStyle: React.CSSProperties = {
  marginTop: 12,
  color: "#334155",
  lineHeight: 1.8,
};

const noteStyle: React.CSSProperties = {
  marginTop: 8,
  color: "#64748b",
  fontSize: 14,
  lineHeight: 1.8,
};

const linkStyle: React.CSSProperties = {
  color: "#0284c7",
  fontWeight: 800,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 24,
  display: "inline-flex",
  padding: "12px 18px",
  borderRadius: 12,
  background: "#0284c7",
  color: "#fff",
  fontWeight: 900,
  textDecoration: "none",
};