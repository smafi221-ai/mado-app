import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaDo - 外の世界があなたのそばに",
  description: "在宅療養者・介護施設向けの風景ライブカメラサービス",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
