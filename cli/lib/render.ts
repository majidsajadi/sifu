import pc from "picocolors";
import semver from "semver";
import { TableUserConfig, getBorderCharacters, table } from "table";
import { differenceString } from "./utils.js";

const { log } = console;

export const renderWarning = (message: string) => log(pc.yellow(message));

export const renderTable = (cols: string[], rows: string[][]) => {
  const config: TableUserConfig = {
    border: getBorderCharacters("norc"),
  };

  const _cols = cols.map((col) => pc.dim(col));
  const _table = table([_cols, ...rows], config);

  log(_table);
};

export function colorizeVersion(version: string, range: string) {
  const parsed = semver.parse(version);
  const current = semver.minVersion(range);
  if (!parsed || !current) return pc.dim(version);

  const diff = semver.diff(current, parsed);
  if (!diff) return pc.dim(version);

  const [same, changed] = differenceString(version, current.toString());

  const color = RELEASE_TYPE_COLOR_MAP[diff];
  // @ts-ignore
  return pc.white(same) + pc[color](changed);
}

const RELEASE_TYPE_COLOR_MAP = {
  major: "red",
  patch: "magenta",
  minor: "yellow",
  premajor: "cyan",
  preminor: "cyan",
  prepatch: "cyan",
  prerelease: "cyan",
};
