export type TObjectPropertyDiff = {
  name: string;
  source?: string;
  target?: string;
};

type TObject = {
  [x: string]: string | undefined;
};

export function compareObjects(source?: TObject, target?: TObject) {
  const result: Array<TObjectPropertyDiff> = [];

  if (source) {
    Object.entries(source).forEach(([name, range]) => {
      result.push({
        name,
        source: range,
      });
    });
  }

  if (target) {
    Object.entries(target).forEach(([name, range]) => {
      const item = result.find((diff) => diff.name === name);

      if (item) {
        item.target = range;
      } else {
        result.push({
          name,
          target: range,
        });
      }
    });
  }

  return result;
}
