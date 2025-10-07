
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Lead MVP",
  description: "30秒 介護ジョブ診断（JA/VI）",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
