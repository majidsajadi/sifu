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
  const resp = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${query}&size=10`,
  );
  return (await resp.json()) as TSearchResponse;
}
