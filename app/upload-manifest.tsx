"use client";

import { Flex, Text, VisuallyHidden } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { uploadAction } from "./upload-action";
import { UploadManifestSpinner } from "./upload-manifest-spinner";
import { ChangeEvent } from "react";

export function UploadManifest() {
  const [state, action] = useFormState(uploadAction, { message: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.form?.requestSubmit();
  };

  return (
    <Flex direction="column">
      <form action={action}>
        <VisuallyHidden>
          <input
            onChange={handleChange}
            type="file"
            id="manifest"
            name="manifest"
            accept="application/json"
          />
        </VisuallyHidden>
        <UploadManifestSpinner />
      </form>
      {!!state.message && (
        <Text size="2" color="red">
          {state.message}
        </Text>
      )}
    </Flex>
  );
}
