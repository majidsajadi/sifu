export type TCompareRouteParams = {
  name: string;
};

export type TCompareSearchParams = {
  range?: string;
  repo?: string;
  owner?: string;
  version?: string;
  directory?: string;
};

export type TComparePageProps = {
  params: TCompareRouteParams;
  searchParams: TCompareSearchParams;
};
