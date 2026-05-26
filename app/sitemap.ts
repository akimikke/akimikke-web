// app/sitemap.ts
import type { MetadataRoute } from "next";

const PREFS = [
  "hokkaido","aomori","iwate","miyagi","akita","yamagata","fukushima",
  "ibaraki","tochigi","gunma","saitama","chiba","tokyo","kanagawa",
  "niigata","toyama","ishikawa","fukui","yamanashi","nagano","gifu","shizuoka","aichi",
  "mie","shiga","kyoto","osaka","hyogo","nara","wakayama",
  "tottori","shimane","okayama","hiroshima","yamaguchi",
  "tokushima","kagawa","ehime","kochi",
  "fukuoka","saga","nagasaki","kumamoto","oita","miyazaki","kagoshima","okinawa",
] as const;

const SERVICES = ["sk","gh","ab","hd","jh","ss","sn","jn","tk"] as const;

// 本番は https://あなたのドメイン にする（ローカルはこれでOK）
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
  ];

  for (const pref of PREFS) {
    for (const service of SERVICES) {
      urls.push({
        url: `${SITE_URL}/jp/${pref}/${service}`,
        lastModified: now,
      });
    }
  }

  return urls;
}