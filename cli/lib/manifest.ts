import path from "node:path";
import fs from "node:fs/promises";
import { SifuError } from "./error.js";
import { TManifest } from "./types.js";

export async function readManifest(manifestPath: string): Promise<TManifest> {
  try {
    const manifest = (await loadJsonFile(
      path.join(manifestPath, "package.json")
    )) as TManifest;
    return manifest;
  } catch (err: unknown) {
    throw new SifuError(
      "BAD_PACKAGE_JSON",
      `${manifestPath}: ${(err as Error).message as string}`
    );
  }
}

async function loadJsonFile(filePath: string) {
  const buffer = await fs.readFile(filePath);
  const data = new TextDecoder().decode(buffer);
  return JSON.parse(data);
}
