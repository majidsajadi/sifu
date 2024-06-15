import type { TCommonOptions, TRangeOptions } from "../options.js";

export type TChangelogOptions = TCommonOptions & TRangeOptions

export async function changelog(dependency: string, options: TChangelogOptions) {
  console.log(1, dependency, options);
}
