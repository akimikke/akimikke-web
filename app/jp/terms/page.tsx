import Link from "next/link";

export const metadata = {
  title: "利用規約｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）の利用規約です。障害福祉サービスの空き状況検索、施設情報、免責事項、禁止事項について定めています。",
};

export default function TermsPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← トップへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>利用規約</h1>

        <p style={textStyle}>
          アオコマ合同会社（以下「当社」といいます。）は、当社が提供する
          「AkiMikke（あきみっけ）」の利用について、以下のとおり利用規約を定めます。
        </p>

        {sections.map((s) => (
          <section key={s.title} style={sectionStyle}>
            <h2 style={headingStyle}>{s.title}</h2>
            <p style={textStyle}>{s.body}</p>
          </section>
        ))}

        <p style={dateStyle}>制定：2025年11月1日</p>
      </section>
    </main>
  );
}

const sections = [
  {
    title: "1. AkiMikkeの目的",
    body: "AkiMikkeは、障害福祉サービスを探す方が、地域・サービス種別・空き状況等から施設情報を検索しやすくすることを目的とした情報提供サービスです。",
  },
  {
    title: "2. 掲載情報について",
    body: "掲載されている施設情報、空き状況、対応条件等は、施設から提供された情報または当社が確認した情報をもとに表示しています。最新情報は必ず施設へ直接ご確認ください。",
  },
  {
    title: "3. 禁止事項",
    body: "掲載情報の無断転載、不正利用、不正アクセス、虚偽情報の送信、公序良俗に反する行為、当社または第三者の権利を侵害する行為を禁止します。",
  },
  {
    title: "4. サービスの変更・停止",
    body: "当社は、必要に応じてAkiMikkeの内容を変更、停止、終了することがあります。",
  },
  {
    title: "5. 免責事項",
    body: "当社は、掲載情報の正確性、完全性、有用性を保証するものではありません。施設利用、問い合わせ、契約等は利用者ご自身の判断と責任で行ってください。",
  },
  {
    title: "6. 著作権等",
    body: "AkiMikkeに掲載される文章、画像、デザイン、プログラム等に関する権利は、当社または正当な権利者に帰属します。",
  },
  {
    title: "7. 規約の変更",
    body: "当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、本サイト上に掲載した時点から効力を生じます。",
  },
  {
    title: "8. 準拠法・管轄",
    body: "本規約は日本法に準拠し、本サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
  },
];

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
  maxWidth: 900,
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

const sectionStyle = {
  marginTop: 24,
};

const headingStyle = {
  margin: 0,
  fontSize: 20,
  fontWeight: 900,
  color: "#0f172a",
};

const textStyle = {
  marginTop: 10,
  color: "#475569",
  lineHeight: 1.9,
};

const dateStyle = {
  marginTop: 28,
  color: "#64748b",
  fontSize: 14,
};