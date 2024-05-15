"use server";

import { redirect } from "next/navigation";
import type { PackageJson } from "type-fest";

export type TUploadState = {
  message?: string;
};

export async function upload(_: TUploadState, formData: FormData) {
  const file = formData.get("manifest") as File;
  const content = await file.text();

  let manifest!: PackageJson;
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

  redirect(`/?${searchParams.toString()}`);
}
