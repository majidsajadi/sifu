export type TDependencies = Record<string, string>;

export type TManifest = {
  name?: string;
  dependencies?: TDependencies;
  devDependencies?: TDependencies;
};

export type TCommonOptions = {
  path: string;
  // silent: boolean;
  // force: boolean;
  // recursive: boolean;
};

export type TRangeOptions = {
  source?: string;
  target?: string;
};

export type TCompareOptions = {
  from?: string;
  to?: string;
};

export type TFilterOptions = {
  prelease: boolean;
  mode?: "dev" | "prod";
  include?: string;
  exclude?: string;
};
