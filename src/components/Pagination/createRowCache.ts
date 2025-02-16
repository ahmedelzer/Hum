export const createRowCache = (size) => {
  const cache = new Map();
  return {
    get: (key) => cache.get(key),
    set: (key, value) => {
      if (cache.size >= size) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    clear: () => cache.clear(),
  };
};
