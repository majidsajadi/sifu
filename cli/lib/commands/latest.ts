import picomatch from "picomatch";
import picocolors from "picocolors";
import semver from "semver";
import { colorizeVersion, renderTable, renderWarning } from "../render.js";
import { readManifest } from "../manifest.js";
import type { TFilterOptions, TCommonOptions, TManifest } from "../types.js";
import { fetchDependency } from "../registry.js";
import { SifuError } from "../error.js";

type TDependency = {
  name: string;
  range: string;
  dev: boolean;
};

type TDependencyLatestVersions = TDependency & {
  latest: string;
};

export type TLatestOptions = TCommonOptions & TFilterOptions;

export async function latest(options: TLatestOptions) {
  if (!!options.include && !!options.exclude) {
    throw new SifuError(
      "INVALID_OPTION",
      "both `include` and `exclude` options provided"
    );
  }

  if (!!options.mode && ["dev, prod"].includes(options.mode)) {
    throw new SifuError(
      "INVALID_OPTION",
      "`mode` only accept `dev` and `prod` as value"
    );
  }
  
  const manifest = await readManifest(options.path);
  const deps = parseDependencies(manifest, options);
  const filtered = filterDependencies(deps, options);

  if (!filtered.length) {
    renderWarning("No dependency found or matched the filters");
    return;
  }

  const latestVersions = await getDependenciesLatestVersions(filtered);
  const needsUpdate = filterOutUpdatedDependencies(latestVersions);
  renderLatestTable(needsUpdate);
}

function parseDependencies(
  manifest: TManifest,
  options: TLatestOptions
): TDependency[] {
  const dev =
    (!options.mode || options.mode === "dev") && !!manifest.devDependencies
      ? Object.entries(manifest.devDependencies).map(([name, range]) => ({
          name,
          range,
          dev: true,
        }))
      : [];

  const prod =
    (!options.mode || options.mode === "prod") && !!manifest.dependencies
      ? Object.entries(manifest.dependencies).map(([name, range]) => ({
          name,
          range,
          dev: false,
        }))
      : [];

  return [...dev, ...prod];
}

function filterDependencies(deps: TDependency[], options: TLatestOptions) {
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

async function getDependenciesLatestVersions(deps: TDependency[]) {
  return Promise.all(deps.map(getDependencyLatestVersions));
}

async function getDependencyLatestVersions(
  dep: TDependency
): Promise<TDependencyLatestVersions> {
  const metadata = await fetchDependency(dep.name);
  const latest = metadata["dist-tags"].latest;

  return {
    ...dep,
    latest,
  };
}

function filterOutUpdatedDependencies(data: TDependencyLatestVersions[]) {
  return data.filter(({ range, latest }) => {
    const current = semver.minVersion(range);
    if (!current) {
      if (!current) throw new SifuError("INVALID_RANGE", "cant parse range");
    }
    return !semver.eq(current, latest);
  });
}

function renderLatestTable(data: TDependencyLatestVersions[]) {
  const rows = data.map(({ name, range, latest }) => [
    picocolors.white(name),
    picocolors.white(range),
    picocolors.dim("➜"),
    colorizeVersion(latest, range),
  ]);
  renderTable(rows);
}
