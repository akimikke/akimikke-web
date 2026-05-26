// app/lib/types.ts
export type Facility = {
  serviceKey: string;
  code: string;
  name: string;
  prefecture: string;
  region: string;
  address: string;
  email?: string | null;
  phoneNumber?: string | null;
  vacant?: string | null;
  vacantDetail?: string | null;
  vacantUpdatedAt?: string | null;

  // 将来拡張
  daySupport?: string | null;
  shuttle?: string | null;
  officialSiteUrl?: string | null;
  accepttk?: string | null;
};

export type SearchResponse = {
  ok: true;
  service: string;
  serviceLabel: string;
  page: number;
  per: number;
  total: number;
  count: number;
  order: string;
  facilities: Facility[];
  facets: Record<string, any>;
  debug?: Record<string, any>;
};

export type DetailResponse = {
  ok: true;
  facility: Facility | null;
  debug?: Record<string, any>;
};