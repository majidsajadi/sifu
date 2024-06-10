import { queryDependency } from "@/lib/dependency";

type TSearchState = { name: string; description?: string }[] | undefined;

export async function searchAction(_: TSearchState, formData: FormData) {
  const query = formData.get("query")?.toString();
  // validate the query
  if (!query || query.length < 3) return;

  return queryDependency(query);
}
