"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { SiteHeader } from "../_components/SiteHeader";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert("ログインできませんでした。メールアドレスとパスワードを確認してください。");
            return;
        }

        router.push("/");
    }

    return (
        <main style={{ maxWidth: 1120, margin: "40px auto", padding: 20 }}>
            <SiteHeader />

            <section style={{ maxWidth: 420, margin: "32px auto 0" }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                    ログイン
                </h1>

                <p style={{ color: "#64748b", marginBottom: 24 }}>
                    お気に入り機能を利用するにはログインしてください。
                </p>

                <form onSubmit={handleLogin} style={{ display: "grid", gap: 14 }}>
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? "ログイン中..." : "ログイン"}
                    </button>
                </form>

                <div style={{ marginTop: 20 }}>
                    <Link href="/jp/signup" style={{ color: "#2563eb", fontWeight: 700 }}>
                        新規登録はこちら
                    </Link>
                </div>

                <div style={{ marginTop: 16 }}>
                    <Link href="/" style={{ color: "#64748b" }}>
                        ← ホームへ戻る
                    </Link>
                </div>
            </section>
        </main>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 16,
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
};