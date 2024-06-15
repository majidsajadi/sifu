import type { TCommonOptions, TCompareOptions } from "../options.js";

export type TAdvisoriesOptions = TCommonOptions & TCompareOptions;

export async function advisories(dependency: string, options: TAdvisoriesOptions) {
  console.log(1, dependency, options);
}
