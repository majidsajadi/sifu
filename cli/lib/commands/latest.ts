import type { TCommonOptions, TCompareOptions } from "../options.js";

export type TLatestOptions = TCommonOptions & {
  mode?: "dev" | "prod";
  include?: string;
  exclude?: string;
};

export async function latest(options: TLatestOptions) {
  console.log(1, options);
}
