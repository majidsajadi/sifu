"use client";

import { type ChangeEvent } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useDebouncedCallback } from "use-debounce";
import { Box, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { searchAction } from "./search-action";
import { SearchDependencySpinner } from "./search-dependency-spinner";

export function SearchDependency() {
  const [state, action] = useFormState(searchAction, undefined);

  const handleChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.target.form?.requestSubmit();
  }, 300);

  return (
    <form
      action={action}
      style={{
        width: "100%",
        maxWidth: "720px",
      }}
    >
      <TextField.Root
        name="query"
        autoFocus
        autoCapitalize="off"
        autoComplete="off"
        placeholder="Find package"
        variant="soft"
        color="gray"
        size="3"
        style={{
          height: "var(--space-9)",
        }}
        onChange={handleChange}
      >
        <TextField.Slot color="gray">
          <MagnifyingGlassIcon height="28" width="28" />
        </TextField.Slot>
        <SearchDependencySpinner />
      </TextField.Root>
      {!!state?.length && (
        <Box mt="2" maxHeight="420px" overflow="auto">
          <Flex direction="column" gap="2">
            {state.map(({ name, description }) => (
              <Card size="1" key={name} asChild>
                <Link href={`/dependencies/${name}`} style={{ textDecoration: "none" }}>
                  <Flex direction="column" gap="1">
                    <Text color="gray" highContrast>
                      {name}
                    </Text>
                    {description && (
                      <Text size="2" color="gray">
                        {description}
                      </Text>
                    )}
                  </Flex>
                </Link>
              </Card>
            ))}
          </Flex>
        </Box>
      )}
    </form>
  );
}
