import { Source_Code_Pro } from "next/font/google";
import NextLink from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { Box, Container, Flex, Heading, IconButton, Link, Reset, Text, Theme, Tooltip } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { ThemeChanger } from "./theme-changer";
import "./globals.css";
import type { PropsWithChildren } from "react";

const font = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Sifu",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={font.className}>
      <Reset>
        <body>
          <ThemeProvider attribute="class">
            <Theme accentColor="lime" grayColor="gray" radius="small">
              <Container size="4" height="100dvh" overflow="auto">
                <Flex height="100%" direction="column">
                  <Box p="2" asChild>
                    <header>
                      <Flex align="center" justify="between" gap="2">
                        <Link asChild>
                          <NextLink href="/">
                            <Heading>SIFU</Heading>
                          </NextLink>
                        </Link>
                        <Flex align="center" gap="2">
                          <Tooltip content="Source code">
                            <IconButton variant="soft" color="gray" asChild>
                              <NextLink href="https://github.com/majidsajadi/sifu">
                                <GitHubLogoIcon />
                              </NextLink>
                            </IconButton>
                          </Tooltip>
                          <ThemeChanger />
                        </Flex>
                      </Flex>
                    </header>
                  </Box>
                  <Box flexGrow="1" p="2" asChild>
                    <main>{children}</main>
                  </Box>
                  <Box p="2" asChild>
                    <footer>
                      <Text color="gray" size="2">
                        Built by{" "}
                        <Link asChild>
                          <NextLink href="https://github.com/majidsajadi">majidsajadi</NextLink>
                        </Link>
                      </Text>
                    </footer>
                  </Box>
                </Flex>
              </Container>
            </Theme>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </Reset>
    </html>
  );
}
