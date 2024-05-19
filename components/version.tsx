import semver from "semver";
import styles from "./version.module.css";
import clsx from "clsx";

type TVersionProps = {
  value?: string;
  range?: string;
};

export function Version({ value, range }: TVersionProps) {
  if (!range) return <span>{value}</span>;

  const parsed = semver.parse(value);
  const current = semver.minVersion(range);

  if (!parsed || !current) return <span>{value}</span>;

  const diff = semver.diff(current, parsed);

  if (!diff) return <span>{value}</span>;

  return (
    <div>
      <span className={clsx(diff === "major" && styles.major)}>
        {parsed.major}
      </span>
      .
      <span
        className={clsx(
          diff === "major" && styles.major,
          diff === "minor" && styles.minor
        )}
      >
        {parsed.minor}
      </span>
      .
      <span
        className={clsx(
          diff === "major" && styles.major,
          diff === "minor" && styles.minor,
          diff === "patch" && styles.patch
        )}
      >
        {parsed.patch}
      </span>
      {!!parsed.prerelease.length && (
        <span
          className={clsx(
            diff === "major" && styles.major,
            diff === "minor" && styles.minor,
            diff === "patch" && styles.patch,
            diff === "prerelease" && styles.prerelease
          )}
        >
          -{parsed.prerelease.join(".")}
        </span>
      )}
    </div>
  );
}
