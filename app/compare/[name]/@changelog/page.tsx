export default async function Page() {
  await wait;
  return <div>Changelog Page</div>;
}

const wait = new Promise((resolve) => setTimeout(resolve, 50000));
