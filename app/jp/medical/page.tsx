// app/jp/medical/page.tsx

import Link from "next/link";
import { SiteHeader } from "@/app/jp/_components/SiteHeader";

const PREFECTURES = [
  { slug: "hokkaido", label: "北海道" },
  { slug: "aomori", label: "青森県" },
  { slug: "iwate", label: "岩手県" },
  { slug: "miyagi", label: "宮城県" },
  { slug: "akita", label: "秋田県" },
  { slug: "yamagata", label: "山形県" },
  { slug: "fukushima", label: "福島県" },
  { slug: "ibaraki", label: "茨城県" },
  { slug: "tochigi", label: "栃木県" },
  { slug: "gunma", label: "群馬県" },
  { slug: "saitama", label: "埼玉県" },
  { slug: "chiba", label: "千葉県" },
  { slug: "tokyo", label: "東京都" },
  { slug: "kanagawa", label: "神奈川県" },
  { slug: "niigata", label: "新潟県" },
  { slug: "toyama", label: "富山県" },
  { slug: "ishikawa", label: "石川県" },
  { slug: "fukui", label: "福井県" },
  { slug: "yamanashi", label: "山梨県" },
  { slug: "nagano", label: "長野県" },
  { slug: "gifu", label: "岐阜県" },
  { slug: "shizuoka", label: "静岡県" },
  { slug: "aichi", label: "愛知県" },
  { slug: "mie", label: "三重県" },
  { slug: "shiga", label: "滋賀県" },
  { slug: "kyoto", label: "京都府" },
  { slug: "osaka", label: "大阪府" },
  { slug: "hyogo", label: "兵庫県" },
  { slug: "nara", label: "奈良県" },
  { slug: "wakayama", label: "和歌山県" },
  { slug: "tottori", label: "鳥取県" },
  { slug: "shimane", label: "島根県" },
  { slug: "okayama", label: "岡山県" },
  { slug: "hiroshima", label: "広島県" },
  { slug: "yamaguchi", label: "山口県" },
  { slug: "tokushima", label: "徳島県" },
  { slug: "kagawa", label: "香川県" },
  { slug: "ehime", label: "愛媛県" },
  { slug: "kochi", label: "高知県" },
  { slug: "fukuoka", label: "福岡県" },
  { slug: "saga", label: "佐賀県" },
  { slug: "nagasaki", label: "長崎県" },
  { slug: "kumamoto", label: "熊本県" },
  { slug: "oita", label: "大分県" },
  { slug: "miyazaki", label: "宮崎県" },
  { slug: "kagoshima", label: "鹿児島県" },
  { slug: "okinawa", label: "沖縄県" },
];

export default function MedicalTopPage() {
  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1400,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system",
      }}
    >
      <SiteHeader />

      <div style={{ marginTop: 20 }}>
        <Link
          href="/"
          style={{
            color: "#111827",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← トップへ戻る
        </Link>
      </div>

      <section style={{ marginTop: 24 }}>
        <h1
          style={{
            fontSize: 42,
            lineHeight: 1.2,
            fontWeight: 900,
            color: "#111827",
            margin: 0,
          }}
        >
          医療機関紹介
        </h1>

        <p
          style={{
            marginTop: 16,
            color: "#4b5563",
            fontSize: 16,
            lineHeight: 1.9,
            maxWidth: 920,
          }}
        >
          地域ごとの医療機関情報を掲載しています。
          障害福祉サービスと併せて、通院先・連携病院・精神科・小児科・リハビリ等の情報確認にご利用いただけます。
        </p>
      </section>

      <section
        style={{
          marginTop: 36,
          border: "1px solid #e5e7eb",
          borderRadius: 24,
          padding: 24,
          background: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#111827",
            marginBottom: 20,
          }}
        >
          都道府県から探す
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14,
          }}
        >
          {PREFECTURES.map((pref) => (
            <Link
              key={pref.slug}
              href={`/jp/medical/${pref.slug}`}
              style={{
                border: "1px solid #dbeafe",
                background: "#fff",
                borderRadius: 16,
                padding: "14px 16px",
                textDecoration: "none",
                color: "#111827",
                fontWeight: 700,
                transition: "all .15s ease",
              }}
            >
              {pref.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}