"use client";

import CError from "../(common)/error";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <CError error={error} message="Fetching advisories failed." />;
}
