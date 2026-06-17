import Link from "next/link";

export const metadata = {
  title: "FAQ｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）のよくある質問です。障害福祉サービスの空き状況検索、施設情報、問い合わせ方法、掲載情報について説明しています。",
};

const FAQS = [
  {
    q: "AkiMikke（あきみっけ）とは何ですか？",
    a: "障害福祉サービスの空き状況や施設情報を、地域やサービス種別から探せる検索サービスです。",
  },
  {
    q: "どのサービスを探せますか？",
    a: "グループホーム、生活介護、就労継続支援A型・B型、放課後等デイサービス、児童発達支援、ショートステイ、障害者支援施設、児童施設、計画相談支援などに対応しています。",
  },
  {
    q: "施設の空き状況は必ず最新ですか？",
    a: "掲載情報は施設から提供された情報等をもとに表示しています。最新状況は変動するため、利用前に施設へ直接確認することをおすすめします。",
  },
  {
    q: "問い合わせはどこからできますか？",
    a: "各施設の詳細ページから問い合わせできます。施設情報の修正や掲載に関するご連絡も、各問い合わせ窓口からお願いします。",
  },
  {
    q: "施設情報を掲載したい場合はどうすればよいですか？",
    a: "AkiMikkeの登録フォームから施設情報をご登録ください。内容確認後、掲載・更新を行います。",
  },
  {
    q: "利用料金はかかりますか？",
    a: "検索・閲覧は無料で利用できます。施設掲載や事業所向け機能については、別途案内する場合があります。",
  },
];

export default function FaqPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← トップへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>よくある質問</h1>
        <p style={leadStyle}>
          AkiMikke（あきみっけ）の利用方法や掲載情報について、よくある質問をまとめました。
        </p>

        <div style={faqWrapStyle}>
          {FAQS.map((item) => (
            <section key={item.q} style={faqItemStyle}>
              <h2 style={questionStyle}>Q. {item.q}</h2>
              <p style={answerStyle}>A. {item.a}</p>
            </section>
          ))}
        </div>
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

const faqWrapStyle = {
  marginTop: 24,
  display: "grid",
  gap: 14,
};

const faqItemStyle = {
  padding: 18,
  borderRadius: 16,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};

const questionStyle = {
  margin: 0,
  fontSize: 17,
  fontWeight: 900,
  color: "#0f172a",
};

const answerStyle = {
  margin: "10px 0 0",
  color: "#475569",
  lineHeight: 1.9,
};