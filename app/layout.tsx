import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import "@/styles/globals.css";

const font = Noto_Sans_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sifu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
