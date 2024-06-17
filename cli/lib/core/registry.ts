import semver from "semver";
import { SifuError } from "../error.js";
import { TLocalDependency } from "./manifest.js";

const REGISTRY_URL = "https://registry.npmjs.org";

type TRemoteDependencyRepository =
  | string
  | {
      type: string;
      url: string;
      directory?: string;
    };

type TRemoteDependency = Readonly<{
  dependencyName: string;
  modified: string;
  "dist-tags": {
    latest: string;
  };
  versions: Record<
    string,
    {
      version: string;
      dependencies?: Partial<Record<string, string>>;
      deprecated?: string;
      engines?: Partial<Record<string, string>>;
      // not exists if the `abbreviated` is true
      repository?: TRemoteDependencyRepository;
    }
  >;
}>;

async function fetchDependency(dependencyName: string, abbreviated = true) {
  const url = new URL(
    encodeURIComponent(dependencyName).replace(/^%40/, "@"),
    REGISTRY_URL
  );

  // fetch full metadata or abbreviated version. the full metadata includes information such as repository
  const headers = abbreviated
    ? {
        accept:
          "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      }
    : undefined;

  const resp = await fetch(url, { headers, keepalive: true });

  if (resp.ok) {
    return (await resp.json()) as TRemoteDependency;
  }

  if (resp.status === 404) {
    throw new SifuError(
      "REGISTRY_DEPENDENCY_NOT_FOUND",
      `Dependency \`${dependencyName}\` could not be found in registry`
    );
  }

  throw new SifuError("REGISTRY_NETWORK_ERROR", await resp.text());
}

async function getLatestVersion(dependencyName: string) {
  const dependency = await fetchDependency(dependencyName);
  return dependency["dist-tags"].latest;
}

export type TSeverity = "critical" | "high" | "medium" | "low";

type TSecurityAdvisoriesResponse = Record<
  string,
  {
    id: number;
    url: string;
    title: string;
    severity: TSeverity;
    vulnerable_versions: string;
  }[]
>;

async function fetchAdvisories(name: string, source: string, target: string) {
  const url = new URL(`/-/npm/v1/security/advisories/bulk`, REGISTRY_URL);

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [name]: [source, target],
    }),
  });

  if (resp.ok) {
    const result = (await resp.json()) as TSecurityAdvisoriesResponse;
    return result[name];
  }

  throw new SifuError("REGISTRY_NETWORK_ERROR", await resp.text());
}

async function getDependenciesLatestVersions(deps: TLocalDependency[]) {
  return Promise.all(deps.map(getDependencyLatestVersions));
}

async function getDependencyLatestVersions(dep: TLocalDependency) {
  const metadata = await fetchDependency(dep.name);
  const latest = metadata["dist-tags"].latest;

  return {
    ...dep,
    latest,
  };
}

function filterOutUpdatedDependencies(
  data: Array<TLocalDependency & { latest: string }>
) {
  return data.filter(({ range, latest }) => {
    const current = semver.minVersion(range);
    if (!current) {
      if (!current) throw new SifuError("INVALID_RANGE", "cant parse range");
    }
    return !semver.eq(current, latest);
  });
}

async function getOutdatedDependencies(dependencies: TLocalDependency[]) {
  const latestVersions = await getDependenciesLatestVersions(dependencies);
  return filterOutUpdatedDependencies(latestVersions);
}

export type { TRemoteDependency, TRemoteDependencyRepository };

export default {
  getLatestVersion,
  getOutdatedDependencies,
  fetchDependency,
  fetchAdvisories,
};
