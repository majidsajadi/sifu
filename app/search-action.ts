import { search } from "@/lib/registry";
import type { TSearchObjectPackage } from "@/lib/registry";

type TSearchState = TSearchObjectPackage[] | undefined;

export async function searchAction(_: TSearchState, formData: FormData) {
  const query = formData.get("query")?.toString();
  // validate the query
  if (!query || query.length < 3) return;

  const response = await search(query);
  return response.objects.map((obj) => obj.package);
}
