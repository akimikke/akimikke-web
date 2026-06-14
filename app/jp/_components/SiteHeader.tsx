import Link from "next/link";
import { AuthHeader } from "./AuthHeader";

export function SiteHeader() {
    return (
        <header style={headerStyle}>
            <Link href="/" style={logoLinkStyle}>
                <img src="/akimikke-logo.png" alt="AkiMikke" style={logoImageStyle} />
                <span style={logoTextStyle}>AkiMikke</span>
            </Link>

            <AuthHeader />
        </header>
    );
}

const headerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 1120,
    margin: "0 auto 18px",
    padding: "16px 20px",
    borderRadius: 20,
    background: "linear-gradient(135deg, #e0f2fe 0%, #ffffff 60%, #ecfdf5 100%)",
    border: "1px solid #dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 72,
    boxSizing: "border-box",
    overflow: "hidden",
};

const logoLinkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "#0f172a",
    fontSize: 22,
    fontWeight: 900,
    minWidth: 0,
    flex: "1 1 auto",
    overflow: "hidden",
};

const logoTextStyle: React.CSSProperties = {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
};

const logoImageStyle: React.CSSProperties = {
    width: 38,
    height: 38,
    objectFit: "contain",
    flexShrink: 0,
};