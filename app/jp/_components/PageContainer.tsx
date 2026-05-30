import type { CSSProperties, ReactNode } from "react";

export function PageContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main style={mainStyle}>
      {children}
    </main>
  );
}

const mainStyle: CSSProperties = {
  padding: 24,
  maxWidth: 1120,
  margin: "0 auto",
  fontFamily: "system-ui, -apple-system",
};