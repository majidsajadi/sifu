import picomatch from "picomatch";
import semver from "semver";
import { colorizeVersion, renderTable, renderWarning } from "../render.js";
import { readManifest } from "../manifest.js";
import { validateFilterOptions } from "../options.js";
import { filterObject, isEmptyObject } from "../utils.js";
import type {
  TFilterOptions,
  TCommonOptions,
  TDependencies,
  TManifest,
} from "../types.js";
import { fetchDependency } from "../registry.js";

export type TLatestOptions = TCommonOptions & TFilterOptions;

export async function latest(options: TLatestOptions) {
  validateFilterOptions(options);
  const manifest = await readManifest(options.path);
  const parsed = parseDependencies(manifest, options);
  const filtered = filterDependencies(parsed, options);

  if (isEmptyObject(filtered)) {
    renderWarning("No dependency found or matched the filters");
    return;
  }

  const result = await getDependenciesLatestVersions(filtered);
  renderLatestTable(result);
}

function renderLatestTable(data: TDependencyLatestVersions[]) {
  const cols = ["name", "range", "latest satisfies", "latest"];
  const rows = data.map(({ name, range, latest, latestSatisfies }) => [
    name,
    range,
    colorizeVersion(latestSatisfies, range),
    colorizeVersion(latest, range),
  ]);
  renderTable(cols, rows);
}

function parseDependencies(
  manifest: TManifest,
  options: TLatestOptions
): TDependencies {
  const dev =
    !options.mode || options.mode === "dev" ? manifest.devDependencies : {};

  const prod =
    !options.mode || options.mode === "prod" ? manifest.dependencies : {};

  return {
    ...dev,
    ...prod,
  };
}

function filterDependencies(deps: TDependencies, options: TLatestOptions) {
  if (!!options.include) {
    const match = picomatch(options.include);
    return filterObject(deps, ([name]) => match(name));
  }

  if (!!options.exclude) {
    const match = picomatch(options.exclude);
    return filterObject(deps, ([name]) => !match(name));
  }

  return deps;
}

export async function getDependenciesLatestVersions(
  deps: Record<string, string>
) {
  const promises = Object.entries(deps).map(([name, range]) =>
    getDependencyLatestVersions(name, range)
  );
  return Promise.all(promises);
}

type TDependencyLatestVersions = {
  name: string;
  range: string;
  latest: string;
  latestSatisfies: string;
};

export async function getDependencyLatestVersions(
  name: string,
  range: string
): Promise<TDependencyLatestVersions> {
  const metadata = await fetchDependency(name);
  // latest tag is used by npm to identify the current version of a package.
  const latest = metadata["dist-tags"].latest;
  const versions = Object.keys(metadata.versions);
  // find latest version that satisfies the semver range provided.
  const latestSatisfies = semver.maxSatisfying(versions, range) ?? "";

  return {
    name,
    range,
    latest,
    latestSatisfies,
  };
}
