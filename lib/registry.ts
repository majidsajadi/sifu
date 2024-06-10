export type TSearchObjectPackage = {
  name: string;
  description?: string;
  // unused fields omitted
};

type TSearchObject = {
  package: TSearchObjectPackage;
  // unused fields omitted
};

type TSearchResponse = {
  objects: TSearchObject[];
  // unused fields omitted
};

export async function search(query: string) {
  const resp = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}&size=10`, {
    next: {
      revalidate: 3600,
    },
  });
  return (await resp.json()) as TSearchResponse;
}

const REGISTRY_URL = "https://registry.npmjs.org";
// TODO: use the alternate url as fallback registry
// const ALTERNATE_REGISTRY_URL = "https://registry.yarnpkg.com";

class RegistryNotFoundError extends Error {
  constructor(name: string) {
    super(`Package \`${name}\` could not be found`);
    this.name = "RegistryNotFoundError";
  }
}

class RegistryNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistryNetworkError";
  }
}

type TRegistryDependency = Readonly<{
  name: string;
  modified: string;
  "dist-tags": DistTags;
  versions: Record<string, unknown>;
}>;

type DistTags = {
  latest: string;
  // unused fields omitted
};

const REVALIDATE_FETCH_DEPENDENCY = (12 * 60) & 60;

// TODO: bulkhead?
export async function fetchDependency(name: string) {
  const url = new URL(encodeURIComponent(name).replace(/^%40/, "@"), REGISTRY_URL);

  const headers = {
    accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
  };

  // TODO: retry
  // TODO: timeout?
  const resp = await fetch(url, { headers, next: { revalidate: REVALIDATE_FETCH_DEPENDENCY } });

  if (resp.ok) {
    return (await resp.json()) as TRegistryDependency;
  }

  if (resp.status === 404) {
    throw new RegistryNotFoundError(name);
  }

  throw new RegistryNetworkError(await resp.text());
}
