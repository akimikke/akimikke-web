import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ソーシャルメディアポリシー｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）を運営するアオコマ合同会社のソーシャルメディアポリシーです。",
};

export default function SocialMediaPolicyPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← ホームへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>ソーシャルメディアポリシー</h1>

        <p style={paragraphStyle}>
          アオコマ合同会社は、ソーシャルメディアの利用において、関係法令を遵守し、良識ある情報発信を行います。
        </p>

        <h2 style={headingStyle}>基本方針</h2>
        <p style={paragraphStyle}>
          ソーシャルメディア上での発信は、不特定多数の方が閲覧できる公開情報であることを認識し、正確で誠実な情報提供に努めます。
        </p>

        <h2 style={headingStyle}>公式アカウントについて</h2>
        <p style={paragraphStyle}>
          AkiMikkeまたはアオコマ合同会社に関する公式情報は、当社が管理する公式サイト、公式アプリ、公式SNS等を通じて発信します。
        </p>

        <h2 style={headingStyle}>免責事項</h2>
        <p style={paragraphStyle}>
          ソーシャルメディア上の情報は、発信時点のものであり、その後変更される場合があります。正式な情報は公式サイト等をご確認ください。
        </p>

        <h2 style={headingStyle}>お問い合わせ</h2>
        <p style={paragraphStyle}>
          ソーシャルメディアに関するお問い合わせは、AkiMikke運営事務局までご連絡ください。
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

const dateStyle: React.CSSProperties = {
  marginTop: 28,
  color: "#6b7280",
  fontSize: 14,
};