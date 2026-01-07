import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Global Nomad",
  description: "Global Nomad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
