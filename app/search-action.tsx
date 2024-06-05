"use server";

import { type TSearchObjectPackage, search } from "@/core/search";

type TSearchState = TSearchObjectPackage[] | undefined;

export async function searchAction(
  prevState: TSearchState,
  formData: FormData
) {
  const query = formData.get("query")?.toString();

  if (!query || query.length < 3) return;

  const response = await search(query);

  return response.objects.map((obj) => obj.package);
}