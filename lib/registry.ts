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

type TSearchDependencyResponse = {
  objects: {
    package: {
      name: string;
      description?: string;
      // unused fields omitted
    };
    // unused fields omitted
  }[];
  // unused fields omitted
};

const REVALIDATE_SEARCH_DEPENDENCY = (12 * 60) & 60;

export async function searchDependency(query: string) {
  const url = new URL(`/-/v1/search?text=${query}&size=10`, REGISTRY_URL);

  // TODO: timeout?
  const resp = await fetch(url, { next: { revalidate: REVALIDATE_SEARCH_DEPENDENCY } });

  if (resp.ok) {
    return (await resp.json()) as TSearchDependencyResponse;
  }

  throw new RegistryNetworkError(await resp.text());
}

type TFetchDependencyResponse = Readonly<{
  name: string;
  modified: string;
  "dist-tags": {
    latest: string;
    // unused fields omitted
  };
  versions: Record<
    string,
    {
      version: string;
      deprecated?: string;
      // unused fields omitted
    }
  >;
}>;

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
    return (await resp.json()) as TFetchDependencyResponse;
  }

  if (resp.status === 404) {
    throw new RegistryNotFoundError(name);
  }

  throw new RegistryNetworkError(await resp.text());
}
