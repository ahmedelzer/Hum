export function filterArrayByKey<T extends Record<string, any>>(
  referenceArr: T[],
  targetArr: T[],
  key: keyof T
): T[] {
  const referenceKeys = new Set(referenceArr.map((item) => item[key]));

  // Modify the targetArr in place
  for (let i = targetArr.length - 1; i >= 0; i--) {
    if (referenceKeys.has(targetArr[i][key])) {
      targetArr.splice(i, 1);
    }
  }

  return targetArr;
}
