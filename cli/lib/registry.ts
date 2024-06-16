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

export type TRegistryVersionRepository =
  | string
  | {
      type: string;
      url: string;
      directory?: string;
    };

type TFetchDependencyResponse = Readonly<{
  name: string;
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
      repository?: TRegistryVersionRepository;
    }
  >;
}>;

const REVALIDATE_FETCH_DEPENDENCY = (12 * 60) & 60;

export async function fetchDependency(name: string, abbreviated = true) {
  const url = new URL(encodeURIComponent(name).replace(/^%40/, "@"), REGISTRY_URL);

  // fetch full metadata or abbreviated version. the full metadata includes information such as repository
  const headers = abbreviated
    ? {
        accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      }
    : undefined;

  const resp = await fetch(url, { headers, keepalive: true });

  if (resp.ok) {
    return (await resp.json()) as TFetchDependencyResponse;
  }

  if (resp.status === 404) {
    throw new RegistryNotFoundError(name);
  }

  throw new RegistryNetworkError(await resp.text());
}

