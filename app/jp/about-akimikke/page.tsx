import Link from "next/link";

export default function AboutAkiMikkePage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <Link href="/" style={backStyle}>
          ← ホームへ戻る
        </Link>

        <h1 style={titleStyle}>AkiMikkeとは</h1>

        <p style={leadStyle}>
          AkiMikke（あきみっけ）は、障害福祉サービスの空き状況を検索できるサービスです。
        </p>

        <p style={textStyle}>
          利用者・ご家族・相談支援専門員が、
          地域やサービス種別から施設を探しやすくすることを目的としています。
        </p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>掲載サービス</h2>

          <ul style={listStyle}>
            <li>グループホーム</li>
            <li>生活介護</li>
            <li>就労継続支援A/B型</li>
            <li>放課後等デイサービス</li>
            <li>児童発達支援</li>
            <li>ショートステイ</li>
            <li>障害者支援施設</li>
            <li>児童施設</li>
            <li>計画相談支援</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>AkiMikkeでできること</h2>

          <h3 style={h3Style}>空き状況検索</h3>
          <p style={textStyle}>
            施設の空き状況を確認できます。
          </p>

          <h3 style={h3Style}>地域検索</h3>
          <p style={textStyle}>
            都道府県や地域から施設を探せます。
          </p>

          <h3 style={h3Style}>施設比較</h3>
          <p style={textStyle}>
            複数施設の特徴を比較できます。
          </p>

          <h3 style={h3Style}>お気に入り登録</h3>
          <p style={textStyle}>
            気になる施設を保存できます。
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>今後の予定</h2>

          <ul style={listStyle}>
            <li>空き状況のリアルタイム更新</li>
            <li>施設掲載数の拡大</li>
            <li>お気に入り通知機能</li>
            <li>利用者向けレビュー機能</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>運営</h2>

          <p style={textStyle}>
            アオコマ合同会社
            <br />
            福祉サービス検索アプリ「AkiMikke」運営
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

const h3Style = {
  fontSize: 20,
  fontWeight: 700,
  marginTop: 16,
};

const listStyle = {
  lineHeight: 2,
};