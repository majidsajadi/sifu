"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { searchAction } from "./search-action";
import { SearchPacakgeSpinner } from "./search-package-spinner";

export function SearchPacakge() {
  const [state, action] = useFormState(searchAction, undefined);

  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.target.form?.requestSubmit();
    },
    30
  );

  return (
    <form action={action}>
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
          width: "420px",
          height: "var(--space-9)",
        }}
        onChange={handleChange}
      >
        <TextField.Slot color="gray">
          <MagnifyingGlassIcon height="28" width="28" />
        </TextField.Slot>
        <SearchPacakgeSpinner />
      </TextField.Root>
      {!!state?.length && (
        <Box mt="2" width="420px" maxHeight="420px" overflow="auto">
          <Flex direction="column" gap="2">
            {state.map(({ name, description }) => (
              <Card size="1">
                <Link
                  href={`/dependencies/${name}`}
                  style={{ textDecoration: "none" }}
                >
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
