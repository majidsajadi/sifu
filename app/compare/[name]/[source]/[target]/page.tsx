export default async function Page({
  params,
}: {
  params: { name: string; source: string; target: string };
}) {
  const name = decodeURIComponent(params.name);
  const source = decodeURIComponent(params.source);
  const target = decodeURIComponent(params.target);

  return (
    <div>
      {name} - {source} - {target}
    </div>
  );
}
