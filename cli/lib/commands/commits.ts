import type { TCommonOptions, TRangeOptions } from "../types.js";

export type TCommitsOptions = TCommonOptions & TRangeOptions

export async function commits(dependency: string, options: TCommitsOptions) {
  console.log(1, dependency, options);
}
