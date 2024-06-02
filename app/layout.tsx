import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { Source_Code_Pro } from "next/font/google";

import "./globals.css";

const font = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
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
    <html lang="en" suppressHydrationWarning className={font.className}>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="lime" grayColor="gray" radius="small">
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
