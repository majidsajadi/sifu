import path from "node:path";
import fs from "node:fs/promises";
import semver from "semver";
import picomatch from "picomatch";
import { SifuError } from "../error.js";
import { TCommonOptions, TFilterOptions } from "../types.js";

type TManifest = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type TLocalDependency = {
  name: string;
  range: string;
  dev: boolean;
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

async function getDependencies(options: TCommonOptions & TFilterOptions) {
  const manifest = await readManifest(options.path);
  const deps = parseDependencies(manifest, options.mode);
  return filterDependencies(deps, options);
}

function parseDependencies(manifest: TManifest, mode: TFilterOptions["mode"]) {
  const dev =
    (!mode || mode === "dev") && !!manifest.devDependencies
      ? Object.entries(manifest.devDependencies).map(([name, range]) => ({
          name,
          range,
          dev: true,
        }))
      : [];

  const prod =
    (!mode || mode === "prod") && !!manifest.dependencies
      ? Object.entries(manifest.dependencies).map(([name, range]) => ({
          name,
          range,
          dev: false,
        }))
      : [];

  return [...dev, ...prod] as TLocalDependency[];
}

function filterDependencies(deps: TLocalDependency[], options: TFilterOptions) {
  if (!!options.include) {
    const match = picomatch(options.include);
    return deps.filter((dep) => match(dep.name));
  }

  if (!!options.exclude) {
    const match = picomatch(options.exclude);
    return deps.filter((dep) => !match(dep.name));
  }

  return deps;
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

export type { TLocalDependency };

export default { getInstalledVersion, getDependencies };
