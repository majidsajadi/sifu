"use client";

import { useFormStatus } from "react-dom";
import { Button, Spinner } from "@radix-ui/themes";

export function UploadManifestSpinner() {
  const { pending } = useFormStatus();

  return (
    <Button type="button" variant="ghost" disabled={pending}>
      <Spinner loading={pending} />
      <label htmlFor="manifest">Uploads package.json</label>
    </Button>
  );
}
