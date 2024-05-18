"use client";

import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { Button } from "@/ui/button";
import styles from "./header.module.css";
import Link from "next/link";

export function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logo} href="/">
          Sifu
        </Link>
        <Link href="/upload">Upload</Link>
      </nav>
      <div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="https://github.com/majidsajadi/sifu">
            <Github size={16} />
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {resolvedTheme === "dark" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
