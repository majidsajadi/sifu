"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/ui/button";
import { ThemeChanger } from "./theme-changer";
import styles from "./header.module.css";

export function Header() {
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
        <ThemeChanger />
      </div>
    </header>
  );
}
