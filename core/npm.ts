import packageJson, { type FullMetadata } from "package-json";

export const npm = {
  fetchDependency(name: string) {
    return packageJson(name, {
      allVersions: true,
      fullMetadata: true,
    });
  },
};
