import type { TCommonOptions, TCompareOptions } from "../options.js";

export type TEnginesOptions = TCommonOptions & TCompareOptions;

export async function engines(dependency: string, options: TEnginesOptions) {
  console.log(1, dependency, options);
}
