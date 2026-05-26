"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "./favorites";

export function FavoriteButton(props: {
  facilityId: string;
  size?: number;
}) {
  const { facilityId, size = 26 } = props;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(facilityId));

    const onChange = () => setFav(isFavorite(facilityId));
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(facilityId);
        setFav(isFavorite(facilityId));
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