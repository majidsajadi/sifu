"use client";

import { Button, Spinner } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

export function UploadManifestSpinner() {
  const { pending } = useFormStatus();

  return (
    <Button type="button" variant="ghost" disabled={pending}>
      <Spinner loading={pending} />
      <label htmlFor="manifest">Uploads package.json</label>
    </Button>
  );
}
