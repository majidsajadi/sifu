"use server";

import { redirect } from "next/navigation";

type TManifest = {
  dependencies?: Partial<Record<string, string>>;
};

export type TUploadState = {
  message?: string;
};

export async function uploadAction(_: TUploadState, formData: FormData) {
  const file = formData.get("manifest") as File;
  const content = await file.text();

  let manifest!: TManifest;
  try {
    manifest = JSON.parse(content);
  } catch (error) {
    return {
      message: "Unable to parse the manifest",
    };
  }

  if (!manifest.dependencies || !Object.keys(manifest.dependencies).length) {
    return {
      message: "Unable to find any dependency in the manifest",
    };
  }

  const searchParams = new URLSearchParams();

  Object.entries(manifest.dependencies).forEach(([name, range]) => {
    searchParams.append("dep", name + "," + range);
  });

  return redirect(`/dependencies?${searchParams.toString()}`);
}
