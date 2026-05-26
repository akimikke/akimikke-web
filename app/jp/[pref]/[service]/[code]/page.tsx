// app/jp/[pref]/[service]/[code]/page.tsx
import { notFound } from "next/navigation";
import { FacilityDetailClient } from "../../../_components/FacilityDetailClient";

export const dynamic = "force-dynamic";

const SERVICE_LABEL: Record<string, string> = {
  sk: "生活介護",
  gh: "グループホーム",
  ab: "就労継続A/B",
  hd: "放課後等デイ",
  jh: "児童発達支援",
  ss: "ショートステイ",
  sn: "障害者支援施設(入所)",
  jn: "児童施設(入所)",
  tk: "計画相談支援",
};

function isValidService(service: string) {
  return Object.prototype.hasOwnProperty.call(SERVICE_LABEL, service);
}

type PageParams = { pref: string; service: string; code: string };
type SP = Record<string, string | string[] | undefined>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams?: Promise<SP>;
}) {
  const p = await params;
  const sp = (await searchParams) ?? {};

  const prefSlug = String(p.pref ?? "").trim();
  const serviceKey = String(p.service ?? "").trim().toLowerCase();
  const facilityCode = String(p.code ?? "").trim();

  if (!prefSlug || !facilityCode || !isValidService(serviceKey)) {
    notFound();
  }

  const disRaw = Array.isArray(sp.dis) ? sp.dis[0] : sp.dis;
  const initialDisCsv = String(disRaw ?? "").trim();

  const qs = new URLSearchParams();
  qs.set("service", serviceKey);
  qs.set("pref", prefSlug);
  qs.set("code", facilityCode);

  const apiPath = `/api/v1/facilities/detail?${qs.toString()}`;

  return (
    <FacilityDetailClient
      apiPath={apiPath}
      prefSlug={prefSlug}
      serviceKey={serviceKey}
      initialDisCsv={initialDisCsv}
    />
  );
}