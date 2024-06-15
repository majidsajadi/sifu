import type { TCommonOptions, TCompareOptions } from "../options.js";

export type TSizeOptions = TCommonOptions & TCompareOptions;

export async function size(dependency: string, options: TSizeOptions) {
  console.log(1, dependency, options);
}
