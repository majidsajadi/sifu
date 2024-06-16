import pc from "picocolors";
import semver from "semver";
import { getBorderCharacters, table } from "table";
import { SifuError } from "./error.js";

export function renderWarning(message: string) {
  console.log(pc.yellow(message));
}

export function renderTable(rows: string[][]) {
  console.log(
    table([...rows], {
      border: getBorderCharacters("void"),
    })
  );
}

export function colorizeText(text: string) {
  return pc.white(text);
}

export function colorizeSecondryText(text: string) {
  return pc.white(text);
}

export function colorizeVersion(version: string, range: string) {
  const current = semver.minVersion(range)?.toString();
  if (!current) throw new SifuError("INVALID_RANGE", "cant parse range");

  const diff = semver.diff(current, version);
  if (!diff) return pc.dim(version);

  const diffStart = [...version].findIndex(
    (char, index) => char !== current[index]
  );

  const same = version.substring(0, diffStart);
  const changed = version.substring(diffStart);

  const color = RELEASE_TYPE_COLOR_MAP[diff];
  // @ts-ignore
  return pc.white(same) + pc[color](changed);
}

const RELEASE_TYPE_COLOR_MAP = {
  major: "red",
  minor: "cyan",
  patch: "green",
  premajor: "yellow",
  preminor: "yellow",
  prepatch: "yellow",
  prerelease: "yellow",
};
