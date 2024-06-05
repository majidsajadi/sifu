import NextLink from "next/link";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Source_Code_Pro } from "next/font/google";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Reset,
  Text,
  Theme,
  Tooltip,
  Link,
} from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeChanger } from "./theme-changer";

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
      <Reset>
        <body>
          <ThemeProvider attribute="class">
            <Theme accentColor="lime" grayColor="gray" radius="small">
              <Container size="4" height="100dvh">
                <Flex height="100%" direction="column">
                  <Box p="2" asChild>
                    <header>
                      <Flex align="center" justify="between" gap="2">
                        <Heading color="lime">SIFU</Heading>
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
                          <NextLink href="https://github.com/majidsajadi">
                            majidsajadi
                          </NextLink>
                        </Link>
                      </Text>
                    </footer>
                  </Box>
                </Flex>
              </Container>
            </Theme>
          </ThemeProvider>
        </body>
      </Reset>
    </html>
  );
}
