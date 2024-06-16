export type TDependencies = Record<string, string>;

export type TManifest = {
  name?: string;
  dependencies?: TDependencies;
  devDependencies?: TDependencies;
};

export type TCommonOptions = {
  path: string;
};

export type TRangeOptions = {
  from?: string;
  to?: string;
};

export type TCompareOptions = {
  source?: string;
  target?: string;
};

export type TFilterOptions = {
  mode?: "dev" | "prod";
  include?: string;
  exclude?: string;
};
