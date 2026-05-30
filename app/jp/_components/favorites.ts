import { supabase } from "@/app/lib/supabase";

const FAVORITES_KEY = "akimikke:favorites";

export async function getFavorites(): Promise<string[]> {
  if (typeof window === "undefined") return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("facility_code")
    .eq("user_id", user.id);

  if (error || !data) {
    console.error(error);
    return [];
  }

  return data.map((x) => x.facility_code);
}

export async function isFavorite(id: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(id);
}

export async function toggleFavorite(
  facilityId: string,
  serviceType: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未ログイン時は localStorage
  if (!user) {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const current = raw ? JSON.parse(raw) : [];

    const next = current.includes(facilityId)
      ? current.filter((x: string) => x !== facilityId)
      : [...current, facilityId];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));

    window.dispatchEvent(new Event("favorites-changed"));
    return;
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("facility_code", facilityId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id);
  } else {
    await supabase.from("favorites").insert({
      user_id: user.id,
      facility_code: facilityId,
      service_type: serviceType,
    });
  }

  window.dispatchEvent(new Event("favorites-changed"));
}

export async function removeFavorite(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("facility_code", id);

  window.dispatchEvent(new Event("favorites-changed"));
}