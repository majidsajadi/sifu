import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Source_Code_Pro } from "next/font/google";
import { Header } from "@/components/header";
import styles from './layout.module.css';

import "@/styles/globals.css";

const font = Source_Code_Pro({
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
          <div className={styles.container}>
            <Header />
            <main  className={styles.main}>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
