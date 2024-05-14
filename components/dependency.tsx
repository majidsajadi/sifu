type TDependencyProps = {
  name: string;
  range: string;
};

export async function Dependency({ name, range }: TDependencyProps) {
  return (
    <div>
      {name}: {range}
    </div>
  );
}

export function DependencyLoading() {
  return <div>loading</div>;
}
