import { SifuError } from "./error.js";
import { TFilterOptions } from "./types.js";

export function validateFilterOptions(options: TFilterOptions) {
  if (!!options.include && !!options.exclude) {
    throw new SifuError(
      "INVALID_OPTION",
      "both `include` and `exclude` options provided"
    );
  }

  if (!!options.mode && ["dev, prod"].includes(options.mode)) {
    throw new SifuError(
      "INVALID_OPTION",
      "`mode` only accept `dev` and `prod` as value"
    );
  }
}
