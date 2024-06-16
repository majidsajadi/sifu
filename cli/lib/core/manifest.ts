import path from "node:path";
import fs from "node:fs/promises";
import semver from "semver";
import { SifuError } from "../error.js";

type TManifest = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

async function getInstalledVersion(
  dependencyName: string,
  manifestPath: string
) {
  const manifest = await readManifest(manifestPath);
  // FIXME: we asume the min version of range is the installed version. but i think we should find the installed version from lockfile instead of package.json
  const range = manifest.dependencies?.[dependencyName];

  if (!range) {
    throw new SifuError(
      "MANIFEST_DEPENDENCY_NOT_FOUND",
      `Dependency \`${dependencyName}\` could not be found in manifest`
    );
  }

  const installedVersion = semver.minVersion(range);
  if (!installedVersion) {
    throw new SifuError(
      "NO_INSTALLED_VERSION",
      `Could not determine \`${dependencyName}\` installed version`
    );
  }

  return installedVersion.toString();
}

async function readManifest(manifestPath: string) {
  try {
    const manifest = await loadJsonFile(
      path.join(manifestPath, "package.json")
    );
    return manifest as TManifest;
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

export default { getInstalledVersion, readManifest };
