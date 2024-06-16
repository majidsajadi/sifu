export function isEmptyObject(record?: Record<string, string>) {
  if (!record) return true;
  return !Object.keys(record).length;
}

export function filterObject(
  record: Record<string, string>,
  predicate: (value: [string, string]) => boolean
) {
  return Object.fromEntries(
    Object.entries(record).filter((value) => predicate(value))
  );
}
