"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/ui/button";
import { ThemeChanger } from "./theme-changer";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        Sifu
      </Link>

      <div className={styles.actions}>
        <Button asChild className={styles.upload}>
          <Link href="/upload">Upload</Link>
        </Button>
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
