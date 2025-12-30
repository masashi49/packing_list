import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "忘れ物防止チェックリスト | 持ち物管理アプリ",
  description:
    "持ち物を管理して、忘れ物をゼロにしましょう！リストを作成し、チェック項目を設定するだけで、外出前の確認が簡単に。",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "チェックリスト",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#4F46E5",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 pb-[200px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
