import semver from "semver";
import { Text } from "@radix-ui/themes";

type TDisplayVersionProps = {
  value?: string;
  range?: string;
};

export function DisplayVersion({ value, range }: TDisplayVersionProps) {
  if (!range) return <span>{value}</span>;

  const parsed = semver.parse(value);
  const current = semver.minVersion(range);

  if (!parsed || !current) return <span>{value}</span>;

  const diff = semver.diff(current, parsed);

  if (!diff) return <Text color="gray">{value}</Text>;

  return (
    <Text highContrast>
      <Text color={diff === "major" ? "red" : undefined}>{parsed.major}.</Text>
      <Text color={diff === "major" ? "red" : diff === "minor" ? "orange" : undefined}>{parsed.minor}.</Text>
      <Text color={diff === "major" ? "red" : diff === "minor" ? "orange" : diff === "patch" ? "yellow" : undefined}>
        {parsed.patch}
      </Text>
      {!!parsed.prerelease.length && (
        <Text
          color={
            diff === "major"
              ? "red"
              : diff === "minor"
                ? "orange"
                : diff === "patch"
                  ? "yellow"
                  : diff === "prerelease"
                    ? "cyan"
                    : undefined
          }
        >
          -{parsed.prerelease.join(".")}
        </Text>
      )}
    </Text>
  );
}
