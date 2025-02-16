export function areArraysEqualByKey<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  key: keyof T
): boolean {
  if (arr1.length !== arr2.length) return false;

  // Create Sets of key values for fast comparison
  const set1 = new Set(arr1.map((item) => item[key]));
  const set2 = new Set(arr2.map((item) => item[key]));

  return set1.size === set2.size && [...set1].every((value) => set2.has(value));
}
