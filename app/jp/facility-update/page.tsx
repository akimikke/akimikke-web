import Link from "next/link";

export const metadata = {
  title: "施設情報修正依頼 | AkiMikke（あきみっけ）",
  description:
    "掲載施設の情報修正方法をご案内しています。事業所登録フォームによる更新手順やお問い合わせ先を掲載しています。",
};

const formUrl =
  "https://script.google.com/a/macros/aokoma.com/s/AKfycbwcZlJCGQKFwZwQX3plnX2T8VH4aGeANOPgHwBM9Tm2jUxZZHLAdHbxGzUzH97wCI3v3g/exec";

export default function FacilityUpdatePage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <Link href="/" style={backStyle}>← ホームへ戻る</Link>

        <h1 style={titleStyle}>施設情報修正依頼</h1>

        <p style={leadStyle}>
          AkiMikkeに掲載されている施設情報の変更は、原則として事業所登録フォームの
          「情報更新」からお手続きください。
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>情報更新の手順</h2>
          <ol style={listStyle}>
            <li>下の「事業所登録フォームを開く」を押します。</li>
            <li>フォーム種別で「情報更新（掲載中施設の情報変更）」を選択します。</li>
            <li>事業所指定番号、施設名、サービス種別を入力します。</li>
            <li>「現在の掲載情報を読込」を押します。</li>
            <li>変更したい項目だけ入力・修正します。</li>
            <li>内容を確認して送信してください。</li>
          </ol>

          <div style={buttonWrapStyle}>
            <a href={formUrl} target="_blank" rel="noreferrer" style={primaryButtonStyle}>
              事業所登録フォームを開く
            </a>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>フォームで更新できない場合</h2>
          <p style={textStyle}>
            掲載情報が読み込めない場合、事業所指定番号が分からない場合、削除依頼、
            表示不具合、緊急の修正などは、お問い合わせページよりご連絡ください。
          </p>

          <div style={buttonWrapStyle}>
            <Link href="/jp/contact" style={secondaryButtonStyle}>
              お問い合わせページへ
            </Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>修正できる主な内容</h2>
          <ul style={listStyle}>
            <li>施設名・住所・電話番号</li>
            <li>空き状況・空き詳細</li>
            <li>対象となる障害種別</li>
            <li>送迎・日中一時支援・医療的ケアなどの条件</li>
            <li>施設紹介文・アクセス・費用</li>
            <li>施設画像の差し替え・削除</li>
            <li>掲載停止・削除依頼</li>
          </ul>
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

const buttonWrapStyle = {
  marginTop: 20,
};

const primaryButtonStyle = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 12,
  background: "#0284c7",
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 12,
  background: "#fff",
  color: "#0284c7",
  fontWeight: 800,
  textDecoration: "none",
  border: "1px solid #0284c7",
};