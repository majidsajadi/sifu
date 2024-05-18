"use client";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <header>
      <div>
        The current theme is: {theme}
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
        <button onClick={() => setTheme("system")}>System Mode</button>
      </div>
    </header>
  );
}
