import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）のプライバシーポリシーです。個人情報の取得、利用目的、安全管理、第三者提供、開示請求等について定めています。",
};

export default function PrivacyPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← トップへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>プライバシーポリシー</h1>

        <p style={textStyle}>
          アオコマ合同会社（以下「当社」といいます。）は、AkiMikke（あきみっけ）において取得する個人情報を適切に取り扱うため、
          以下のとおりプライバシーポリシーを定めます。
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
    title: "1. 個人情報の定義",
    body: "本ポリシーにおける個人情報とは、氏名、メールアドレス、電話番号、その他特定の個人を識別できる情報をいいます。",
  },
  {
    title: "2. 個人情報の取得",
    body: "当社は、会員登録、お問い合わせ、施設情報の登録・更新、予約・問い合わせ機能の利用等に際して、必要な範囲で個人情報を取得することがあります。",
  },
  {
    title: "3. 利用目的",
    body: "取得した個人情報は、本人確認、サービス提供、施設・利用者間の連絡、問い合わせ対応、サービス改善、重要なお知らせの送信、不正利用防止のために利用します。",
  },
  {
    title: "4. 第三者提供",
    body: "当社は、本人の同意がある場合、法令に基づく場合、人の生命・身体・財産の保護のために必要な場合を除き、個人情報を第三者に提供しません。",
  },
  {
    title: "5. 業務委託",
    body: "当社は、サービス運営に必要な範囲で、個人情報の取扱いを外部事業者に委託することがあります。その場合、適切な管理・監督を行います。",
  },
  {
    title: "6. 安全管理措置",
    body: "当社は、個人情報の漏えい、滅失、毀損、不正アクセス等を防止するため、必要かつ適切な安全管理措置を講じます。",
  },
  {
    title: "7. Cookie・アクセス解析",
    body: "当サイトでは、利便性向上や利用状況の分析のため、CookieやGoogle Analytics等のアクセス解析ツールを利用する場合があります。",
  },
  {
    title: "8. 開示・訂正・利用停止等",
    body: "ご本人から個人情報の開示、訂正、追加、削除、利用停止等の請求があった場合、法令に基づき適切に対応します。",
  },
  {
    title: "9. ポリシーの変更",
    body: "当社は、法令改正やサービス内容の変更に応じて、本ポリシーを変更することがあります。変更後の内容は本サイト上に掲載します。",
  },
  {
    title: "10. お問い合わせ",
    body: "個人情報の取扱いに関するお問い合わせは、AkiMikkeのお問い合わせ窓口よりご連絡ください。",
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