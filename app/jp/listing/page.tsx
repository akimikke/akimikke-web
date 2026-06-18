import Link from "next/link";

export default function ListingPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <Link href="/" style={backStyle}>
          ← ホームへ戻る
        </Link>

        <h1 style={titleStyle}>施設掲載について</h1>

        <p style={leadStyle}>
          AkiMikke（あきみっけ）では、障害福祉サービス事業所の空き状況・施設情報の掲載を受け付けています。
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載対象サービス</h2>
          <ul style={listStyle}>
            <li>グループホーム（共同生活援助）</li>
            <li>生活介護</li>
            <li>就労継続支援A型・B型</li>
            <li>放課後等デイサービス</li>
            <li>児童発達支援</li>
            <li>ショートステイ（短期入所）</li>
            <li>障害者支援施設</li>
            <li>児童施設</li>
            <li>計画相談支援（障害児相談支援含む）</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載できる情報</h2>
          <ul style={listStyle}>
            <li>施設名</li>
            <li>所在地・アクセス</li>
            <li>対応している障害種別</li>
            <li>空き状況</li>
            <li>送迎・医療的ケア・日中一時支援などの対応状況</li>
            <li>施設の特徴・紹介文</li>
            <li>施設写真</li>
            <li>問い合わせ先など</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載をご希望の事業所様へ</h2>
          <p style={textStyle}>
            掲載をご希望の場合は、施設情報登録フォームまたはお問い合わせよりご連絡ください。
            内容を確認のうえ、AkiMikke上での掲載準備を進めます。
          </p>

          <div style={buttonWrapStyle}>
            <a
              href="https://script.google.com/a/macros/aokoma.com/s/AKfycbwcZlJCGQKFwZwQX3plnX2T8VH4aGeANOPgHwBM9Tm2jUxZZHLAdHbxGzUzH97wCI3v3g/exec"
              style={primaryButtonStyle}
            >
              施設情報登録フォームへ
            </a>

            <Link href="/jp/contact" style={secondaryButtonStyle}>
              お問い合わせ
            </Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載情報について</h2>
          <p style={textStyle}>
            掲載情報は、事業所様から提供された情報または公開情報をもとに作成しています。
            空き状況や受け入れ条件は変更される場合があるため、利用前には必ず事業所へ直接ご確認ください。
          </p>
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
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 20,
};

const primaryButtonStyle = {
  padding: "12px 18px",
  borderRadius: 12,
  background: "#0284c7",
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
};

const secondaryButtonStyle = {
  padding: "12px 18px",
  borderRadius: 12,
  background: "#fff",
  color: "#111827",
  fontWeight: 800,
  textDecoration: "none",
  border: "1px solid #d1d5db",
};