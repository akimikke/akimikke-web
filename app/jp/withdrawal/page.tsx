// app/jp/privacy/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）のプライバシーポリシーです。個人情報の取得、利用目的、第三者提供、安全管理、開示・訂正・利用停止等について掲載しています。",
};

const paragraphs = [
  "アオコマ合同会社（以下「当社」といいます）は、皆様の個人情報の重要性を認識し、その適正な収集、利用、保護をはかるとともに、安全管理を行うため、プライバシーポリシーを定め、次のとおり運用します。",

  "（1）個人情報の定義",
  "このプライバシーポリシーにおいて、個人情報とは、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できる情報、または個人識別符号が含まれる情報をいいます。",

  "（2）個人情報の管理",
  "当社は、個人情報の保護に関する運用体制を整備し、個人情報を適切に管理します。",

  "（3）個人情報の取得",
  "当社は、個人情報を取得する際、利用目的を明確にし、その目的の達成に必要な範囲内で適正な方法により取得します。",

  "（4）個人情報の利用目的",
  "当社は、取得した個人情報を、AkiMikkeの提供、本人確認、お問い合わせ対応、施設情報の登録・更新、サービス改善、利用状況の分析、重要なお知らせの連絡、その他これらに付随する目的のために利用します。",

  "（5）個人情報の第三者提供",
  "当社は、ご本人の同意がある場合、法令に基づく場合、人の生命・身体・財産の保護のために必要な場合等を除き、個人情報を第三者に提供しません。",

  "（6）外部サービスの利用",
  "AkiMikkeでは、アクセス解析、認証、データ管理、地図表示、アプリ配信等のため、外部サービスを利用する場合があります。これらの外部サービスにおける情報の取扱いは、各サービス提供者の規約およびプライバシーポリシーに従います。",

  "（7）個人情報の安全管理",
  "当社は、個人情報の漏えい、滅失、毀損等を防止するため、必要かつ適切な安全管理措置を講じます。",

  "（8）個人情報の開示・訂正・利用停止等",
  "ご本人から個人情報の開示、訂正、追加、削除、利用停止、消去、第三者提供の停止等の請求があった場合、法令に基づき適切に対応します。",

  "（9）Cookie等の利用",
  "当社は、サイトの利便性向上、利用状況の把握、サービス改善のため、Cookie等を利用する場合があります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。",

  "（10）プライバシーポリシーの変更",
  "当社は、法令改正、サービス内容の変更、その他必要に応じて、本プライバシーポリシーを変更することがあります。変更後の内容は、本サイト上に掲載した時点で効力を生じるものとします。",

  "制定：2025年11月1日",
  "最終更新：2026年6月17日",
];

export default function PrivacyPage() {
  return (
    <main style={pageStyle}>
      <Link href="/" style={backStyle}>← ホームへ戻る</Link>

      <section style={cardStyle}>
        <h1 style={titleStyle}>プライバシーポリシー</h1>

        {paragraphs.map((text, index) => (
          <p
            key={index}
            style={
              text.startsWith("（")
                ? headingTextStyle
                : text.includes("制定") || text.includes("最終更新")
                  ? dateTextStyle
                  : paragraphStyle
            }
          >
            {text}
          </p>
        ))}

        <section style={contactBoxStyle}>
          <h2 style={subTitleStyle}>お問い合わせ先</h2>
          <p style={paragraphStyle}>
            アオコマ合同会社<br />
            AkiMikke運営事務局<br />
            メール：customer@akimikke.com
          </p>
        </section>
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
  boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: 30,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "#0f172a",
};

const subTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 20,
  fontWeight: 900,
  color: "#0f172a",
};

const headingTextStyle: React.CSSProperties = {
  margin: "22px 0 8px",
  fontSize: 17,
  fontWeight: 900,
  color: "#111827",
};

const paragraphStyle: React.CSSProperties = {
  margin: "8px 0",
  color: "#374151",
  fontSize: 15,
  lineHeight: 1.9,
};

const dateTextStyle: React.CSSProperties = {
  margin: "10px 0",
  color: "#6b7280",
  fontSize: 14,
  lineHeight: 1.8,
};

const contactBoxStyle: React.CSSProperties = {
  marginTop: 28,
  padding: 18,
  borderRadius: 16,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
};