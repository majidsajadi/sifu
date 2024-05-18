import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Noto_Sans_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/header";

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
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
