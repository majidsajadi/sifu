"use client";

import { useFormStatus } from "react-dom";
import { Spinner, TextField } from "@radix-ui/themes";

export function SearchDependencySpinner() {
  const { pending } = useFormStatus();

  return (
    <TextField.Slot>
      <Spinner size="3" loading={pending} />
    </TextField.Slot>
  );
}
