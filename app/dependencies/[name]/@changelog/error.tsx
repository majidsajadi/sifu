"use client";

import CError from "../(common)/error";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <CError error={error} message="Fetching and parsing changelog failed." />
  );
}
