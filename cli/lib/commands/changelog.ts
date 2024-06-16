import type { TCommonOptions, TRangeOptions } from "../types.js";

export type TChangelogOptions = TCommonOptions & TRangeOptions

export async function changelog(dependency: string, options: TChangelogOptions) {
  console.log(1, dependency, options);
}
