import Link from "next/link";

export const metadata = {
  title: "運営法人｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）の運営法人情報です。障害福祉サービスの空き状況検索サイトを運営するアオコマ合同会社の概要を掲載しています。",
};

export default function AboutPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← トップへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>運営法人</h1>
        <p style={leadStyle}>
          AkiMikke（あきみっけ）は、障害福祉サービスの空き状況を探しやすくするための情報検索サービスです。
        </p>

        <dl style={listStyle}>
          <div style={rowStyle}>
            <dt style={termStyle}>法人名</dt>
            <dd style={descStyle}>アオコマ合同会社</dd>
          </div>

          <div style={rowStyle}>
            <dt style={termStyle}>所在地</dt>
            <dd style={descStyle}>〒108-0074 東京都港区高輪1-16-12</dd>
          </div>

          <div style={rowStyle}>
            <dt style={termStyle}>代表者</dt>
            <dd style={descStyle}>代表社員　小林栄太</dd>
          </div>

          <div style={rowStyle}>
            <dt style={termStyle}>設立</dt>
            <dd style={descStyle}>2020年2月13日</dd>
          </div>

          <div style={rowStyle}>
            <dt style={termStyle}>事業内容</dt>
            <dd style={descStyle}>
              福祉サービス検索アプリ・Webサービス「AkiMikke」の企画、開発、運営
            </dd>
          </div>
        </dl>

        <p style={noteStyle}>
          掲載情報の修正依頼、サービスに関するお問い合わせは、各お問い合わせ窓口よりご連絡ください。
        </p>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: 24,
  background: "#f8fafc",
  fontFamily: "system-ui, -apple-system",
};

const backStyle = {
  display: "inline-block",
  marginBottom: 18,
  color: "#111827",
  textDecoration: "none",
  fontWeight: 700,
};

const cardStyle = {
  maxWidth: 860,
  margin: "0 auto",
  padding: 28,
  borderRadius: 22,
  background: "#fff",
  border: "1px solid #e5e7eb",
};

const titleStyle = {
  margin: 0,
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
};

const leadStyle = {
  marginTop: 14,
  color: "#475569",
  lineHeight: 1.9,
};

const listStyle = {
  marginTop: 24,
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: 16,
  padding: "14px 0",
  borderBottom: "1px solid #e5e7eb",
};

const termStyle = {
  fontWeight: 900,
  color: "#334155",
};

const descStyle = {
  margin: 0,
  color: "#111827",
  lineHeight: 1.8,
};

const noteStyle = {
  marginTop: 22,
  color: "#64748b",
  fontSize: 14,
  lineHeight: 1.8,
};