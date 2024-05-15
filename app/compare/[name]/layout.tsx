export default function Layout({
  children,
  commits,
  changelog,
}: {
  children: React.ReactNode;
  commits: React.ReactNode;
  changelog: React.ReactNode;
}) {
  return (
    <>
      <div>
        <h3>info</h3>
        {children}
      </div>
      <div>
        <h3>commits</h3>
        {commits}
      </div>
      <div>
        <h3>changelog</h3>
        {changelog}
      </div>
    </>
  );
}
