"use client";

import CError from "./(common)/error";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  console.log(error)
  return <CError error={error} message="Fetching commits failed." />;
}
