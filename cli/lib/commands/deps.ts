import type { TCommonOptions, TCompareOptions } from "../options.js";

export type TDepsOptions = TCommonOptions & TCompareOptions;

export async function deps(dependency: string, options: TDepsOptions) {
  console.log(1, dependency, options);
}
