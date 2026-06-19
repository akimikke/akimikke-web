import Link from "next/link";

export const metadata = {
  title: "サイトマップ | AkiMikke（あきみっけ）",
  description:
    "AkiMikke（あきみっけ）のページ一覧です。",
};

export default function SitemapPage() {
    return (
        <main style={pageStyle}>
            <section style={cardStyle}>
                <Link href="/" style={backStyle}>
                    ← ホームへ戻る
                </Link>

                <h1 style={titleStyle}>サイトマップ</h1>

                <p style={leadStyle}>
                    AkiMikke（あきみっけ）の主要ページ一覧です。
                </p>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>サービス</h2>

                    <ul style={listStyle}>
                        <li><Link href="/">トップページ</Link></li>
                        <li><Link href="/jp/favorites">お気に入り</Link></li>
                        <li><Link href="/jp/login">ログイン</Link></li>
                        <li><Link href="/jp/signup">新規登録</Link></li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>ご案内</h2>

                    <ul style={listStyle}>
                        <li><Link href="/jp/about-akimikke">AkiMikkeとは</Link></li>
                        <li><Link href="/jp/faq">よくある質問</Link></li>
                        <li><Link href="/jp/contact">お問い合わせ</Link></li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>事業所向け</h2>

                    <ul style={listStyle}>
                        <li><Link href="/jp/recruit-facilities">掲載施設募集中</Link></li>
                        <li><Link href="/jp/listing">施設掲載について</Link></li>
                        <li><Link href="/jp/facility-update">施設情報修正依頼</Link></li>
                        <li><Link href="/jp/advertising">広告掲載について</Link></li>
                        <li><Link href="/jp/contact">掲載に関するお問い合わせ</Link></li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>各種ポリシー</h2>

                    <ul style={listStyle}>
                        <li><Link href="/jp/about">運営法人</Link></li>
                        <li><Link href="/jp/terms">利用規約</Link></li>
                        <li><Link href="/jp/privacy">プライバシーポリシー</Link></li>
                        <li><Link href="/jp/social-media-policy">SNSポリシー</Link></li>
                        <li><Link href="/jp/withdrawal">退会・アカウント削除</Link></li>
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
    fontSize: 16,
    lineHeight: 1.8,
};

const sectionStyle = {
    marginTop: 40,
};

const h2Style = {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
};

const listStyle = {
    lineHeight: 1.9,
    fontSize: 15,
};