import packageJson from "package-json";
import type { FullMetadata } from "package-json";

export type TDependencyMetadata = FullMetadata;

/**
 * Fetch metadata of a package from the npm registry.
 *
 * @param name - The dependency name
 */
export function fetchDependencyMetadata(
  name: string
): Promise<TDependencyMetadata> {
  return packageJson(name, {
    allVersions: true,
    fullMetadata: true,
  });
}
