"use client";

import { Spinner, TextField } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

export function SearchDependencySpinner() {
  const { pending } = useFormStatus();

  return (
    <TextField.Slot>
      <Spinner size="3" loading={pending} />
    </TextField.Slot>
  );
}
