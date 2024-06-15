export type TCommonOptions = {
  path: string;
  silent: boolean;
  force: boolean;
  recursive: boolean;
};

export type TRangeOptions = {
  source?: string;
  target?: string;
};

export type TCompareOptions = {
  from?: string;
  to?: string;
};
