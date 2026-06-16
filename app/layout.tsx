import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akimikke.com"),

  title: {
    default: "AkiMikke（あきみっけ）｜障害福祉サービスの空き状況検索",
    template: "%s｜AkiMikke（あきみっけ）",
  },

  description:
    "AkiMikke（あきみっけ）は、障害福祉サービスの空き状況を地域・サービス種別から検索できるサイトです。グループホーム、生活介護、就労継続支援A型・B型、放課後等デイサービス、児童発達支援、ショートステイ、短期入所、障害者支援施設、児童施設、計画相談支援などの施設情報を探せます。",

  keywords: [
    "AkiMikke",
    "あきみっけ",
    "アキミッケ",
    "空きみっけ",
    "空き見っけ",
    "akimikke",
    "akimike",
    "障害福祉",
    "障害福祉サービス",
    "障害サービス",
    "空き状況",
    "空き施設",
    "空き情報",
    "グループホーム",
    "共同生活援助",
    "生活介護",
    "障害デイ",
    "デイサービス",
    "就労継続支援A型",
    "就労継続支援B型",
    "就労A",
    "就労B",
    "就A",
    "就B",
    "A型",
    "B型",
    "放課後等デイサービス",
    "放デイ",
    "児童発達支援",
    "児発",
    "ショートステイ",
    "短期入所",
    "入所",
    "障害者支援施設",
    "児童施設",
    "計画相談支援",
    "相談支援",
    "特定相談支援",
    "障害児相談支援",
  ],

  alternates: {
    canonical: "https://akimikke.com",
  },

  openGraph: {
    title: "AkiMikke（あきみっけ）｜障害福祉サービスの空き状況検索",
    description:
      "障害福祉サービスの空き状況を、地域・サービス種別から検索できます。",
    url: "https://akimikke.com",
    siteName: "AkiMikke（あきみっけ）",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/akimikke-logo.png",
        width: 1024,
        height: 1024,
        alt: "AkiMikke（あきみっけ）",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "AkiMikke（あきみっけ）｜障害福祉サービスの空き状況検索",
    description:
      "障害福祉サービスの空き状況を、地域・サービス種別から検索できます。",
    images: ["/akimikke-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          background: "#f8fafc",
          fontFamily: "system-ui, -apple-system",
        }}
      >
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}