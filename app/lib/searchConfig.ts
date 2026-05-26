export type FilterKey =
  | "vacant"
  | "region"
  | "shuttle"
  | "bathing"
  | "daySupport"
  | "keyword";

export type FilterDef = {
  key: FilterKey;
  label: string;
  type: "select" | "text";
  options?: { value: string; label: string }[]; // select用
};

export const SERVICE_LABEL: Record<string, string> = {
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

// ★ アプリの検索条件順をここにそのまま並べる
export const SERVICE_FILTERS: Record<string, FilterDef[]> = {
  sk: [
    { key: "vacant", label: "空き", type: "select", options: [
      { value: "", label: "指定なし" },
      { value: "あり", label: "空きあり" },
      { value: "なし", label: "空きなし" },
    ]},
    { key: "region", label: "エリア（市区町村など）", type: "text" },
    { key: "shuttle", label: "送迎", type: "select", options: [
      { value: "", label: "指定なし" },
      { value: "あり", label: "あり" },
      { value: "なし", label: "なし" },
    ]},
    { key: "bathing", label: "入浴", type: "select", options: [
      { value: "", label: "指定なし" },
      { value: "あり", label: "あり" },
      { value: "なし", label: "なし" },
    ]},
    { key: "daySupport", label: "日中支援", type: "select", options: [
      { value: "", label: "指定なし" },
      { value: "あり", label: "あり" },
      { value: "なし", label: "なし" },
    ]},
    { key: "keyword", label: "キーワード（名称/住所など）", type: "text" },
  ],

  // 例：gh はあとで中身を変える（サービスごとに自由に）
  gh: [
    { key: "vacant", label: "空き", type: "select", options: [
      { value: "", label: "指定なし" },
      { value: "あり", label: "空きあり" },
      { value: "なし", label: "空きなし" },
    ]},
    { key: "region", label: "エリア", type: "text" },
    { key: "keyword", label: "キーワード", type: "text" },
  ],
};