"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton, Tooltip } from "@radix-ui/themes";

export function ThemeChanger() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!isMounted.current) {
    return null;
  }

  return (
    <DropdownMenu.Root>
        <Tooltip content="theme">
      <DropdownMenu.Trigger>
          <IconButton variant="soft" color="gray">
            {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
      </DropdownMenu.Trigger>
        </Tooltip>
      <DropdownMenu.Content size="1">
        <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
