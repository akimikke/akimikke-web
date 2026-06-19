// app/sitemap.ts
import type { MetadataRoute } from "next";

const PREFS = [
  "hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima",
  "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi",
  "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama",
  "tottori", "shimane", "okayama", "hiroshima", "yamaguchi",
  "tokushima", "kagawa", "ehime", "kochi",
  "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa",
] as const;

const SERVICES = ["sk", "gh", "ab", "hd", "jh", "ss", "sn", "jn", "tk"] as const;

// 本番は https://あなたのドメイン にする（ローカルはこれでOK）
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.akimikke.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    {
      url: `${SITE_URL}/jp/about-akimikke`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/jp/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/jp/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/jp/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/jp/listing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/jp/facility-update`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/jp/recruit-facilities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/jp/advertising`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${SITE_URL}/jp/sitemap-page`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
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