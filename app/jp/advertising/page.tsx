import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "広告掲載について | AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）では障害福祉業界に関連する広告掲載を募集しています。福祉用品、介護用品、求人、ICTサービスなどの広告掲載についてご案内します。",
};

export default function AdvertisingPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <Link href="/" style={backStyle}>
          ← ホームへ戻る
        </Link>

        <h1 style={titleStyle}>広告掲載について</h1>

        <p style={leadStyle}>
          AkiMikke（あきみっけ）では、障害福祉サービスに関わる事業者様向けの広告掲載を募集しています。
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>広告掲載の目的</h2>

          <p style={textStyle}>
            AkiMikkeは、障害福祉サービスを探している利用者・ご家族・相談支援専門員へ情報を届けるサービスです。
          </p>

          <p style={textStyle}>
            関連する商品やサービスを紹介することで、利用者と事業者をつなぐことを目的としています。
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載可能な広告例</h2>

          <ul style={listStyle}>
            <li>地域密着型サービス</li>
            <li>福祉用品・介護用品</li>
            <li>送迎車両・福祉車両</li>
            <li>医療・介護関連サービス</li>
            <li>福祉ICTシステム</li>
            <li>人材紹介・人材派遣サービス</li>
            <li>保険サービス</li>
            <li>不動産・住宅関連サービス</li>
            <li>士業（行政書士・社労士・税理士等）</li>
            <li>障害福祉事業者向けサービス</li>
            <li>行政官庁</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載場所</h2>

          <ul style={listStyle}>
            <li>トップページ広告枠</li>
            <li>検索ページ広告枠</li>
            <li>施設詳細ページ広告枠</li>
            <li>その他特設ページ</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載料金</h2>

          <p style={textStyle}>
            現在、広告掲載プランを準備中です。
          </p>

          <p style={textStyle}>
            掲載位置・期間・掲載内容に応じて個別にご案内いたします。
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>お問い合わせ</h2>

          <p style={textStyle}>
            広告掲載をご希望の場合は、下記メールアドレスまでお問い合わせください。
          </p>

          <p style={contactStyle}>
            customer@akimikke.com
          </p>

          <a
            href="mailto:customer@akimikke.com?subject=AkiMikke広告掲載について"
            style={buttonStyle}
          >
            広告掲載について問い合わせる
          </a>
        </section>
      </section>
    </main>
  );
}

const pageStyle = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "32px 16px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 24,
  padding: 32,
};

const backStyle = {
  textDecoration: "none",
  color: "#374151",
  fontWeight: 600,
};

const titleStyle = {
  fontSize: 42,
  fontWeight: 800,
  marginTop: 24,
};

const leadStyle = {
  fontSize: 20,
  lineHeight: 1.8,
};

const textStyle = {
  lineHeight: 1.9,
};

const sectionStyle = {
  marginTop: 40,
};

const h2Style = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 16,
};

const listStyle = {
  lineHeight: 2,
};

const contactStyle = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 16,
};

const buttonStyle = {
  display: "inline-block",
  marginTop: 24,
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  padding: "14px 24px",
  borderRadius: 12,
  fontWeight: 700,
};