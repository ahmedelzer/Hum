export function createRowCache(pageSize) {
  const storage = {};

  return {
    setRows(skip, rows) {
      for (let i = 0; i < rows.length; i++) {
        storage[skip + i] = rows[i];
      }
    },
    getRows(skip, take) {
      const result = [];
      for (let i = 0; i < take; i++) {
        const item = storage[skip + i];
        if (item !== undefined) {
          result.push(item);
        }
      }
      return result;
    },
  };
}
