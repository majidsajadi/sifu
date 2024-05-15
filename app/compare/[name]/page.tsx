import { TComparePageProps } from "./types";

export default async function Page({ params }: TComparePageProps) {
  const { name } = params;
  return <div>Root Page {name}</div>;
}
