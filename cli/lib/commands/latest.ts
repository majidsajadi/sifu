import picomatch from "picomatch";
import { renderWarning } from "../render.js";
import { readManifest } from "../manifest.js";
import { validateFilterOptions } from "../options.js";
import { filterObject, isEmptyObject } from "../utils.js";
import type {
  TFilterOptions,
  TCommonOptions,
  TDependencies,
  TManifest,
} from "../types.js";

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
