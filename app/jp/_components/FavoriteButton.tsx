"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "./favorites";

export function FavoriteButton(props: {
  facilityId: string;
  serviceType?: string;
  size?: number;
}) {
  const { facilityId, serviceType = "unknown", size = 26 } = props;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const load = async () => {
      setFav(await isFavorite(facilityId));
    };

    load();

    const onChange = () => load();
    window.addEventListener("favorites-changed", onChange);

    return () => {
      window.removeEventListener("favorites-changed", onChange);
    };
  }, [facilityId]);

  return (
    <button
      type="button"
      aria-label={fav ? "お気に入り解除" : "お気に入り登録"}
      title={fav ? "お気に入り解除" : "お気に入り登録"}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await toggleFavorite(facilityId, serviceType);
        setFav(await isFavorite(facilityId));
      }}
      style={{
        border: "1px solid #e5e7eb",
        background: "#fff",
        borderRadius: 999,
        width: size + 14,
        height: size + 14,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: size,
        lineHeight: 1,
        color: fav ? "#dc2626" : "#9ca3af",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {fav ? "♥" : "♡"}
    </button>
  );
}