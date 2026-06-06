"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export function AuthHeader() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setEmail(data.user?.email ?? null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setEmail(session?.user?.email ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    async function logout() {
        await supabase.auth.signOut();
        setEmail(null);
        location.href = "/";
    }

    if (email) {
        return (
            <div style={wrapStyle}>
                <Link href="/jp/favorites" style={linkStyle}>
                    お気に入り
                </Link>
                <span style={loginTextStyle}>ログイン中</span>
                <button type="button" onClick={logout} style={logoutButtonStyle}>
                    ログアウト
                </button>
            </div>
        );
    }

    return (
        <div style={wrapStyle}>
            <Link href="/jp/favorites" style={linkStyle}>
                お気に入り
            </Link>
            <Link href="/jp/login" style={linkStyle}>
                ログイン
            </Link>
            <Link href="/jp/signup" style={primaryLinkStyle}>
                新規登録
            </Link>
        </div>
    );
}

const wrapStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 6,
};

const loginTextStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 800,
    color: "#0f172a",
    whiteSpace: "nowrap",
};

const linkStyle: React.CSSProperties = {
    padding: "7px 11px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    color: "#334155",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 700,
    background: "#fff",
    whiteSpace: "nowrap",
};

const primaryLinkStyle: React.CSSProperties = {
    ...linkStyle,
    border: "none",
    color: "#fff",
    background: "#2563eb",
};

const logoutButtonStyle: React.CSSProperties = {
    ...linkStyle,
    cursor: "pointer",
};