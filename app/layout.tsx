import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "障害福祉サービス空き情報｜あきみっけ",
  description: "全国の生活介護・グループホーム・就労継続支援など障害福祉サービス施設の空き情報をリアルタイムで検索。空きあり施設を簡単比較できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          background: "#f8fafc",
          fontFamily: "system-ui, -apple-system",
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#ffffffee",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
            }}
          >
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
