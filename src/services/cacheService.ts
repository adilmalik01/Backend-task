let cache = new Map();
let hits = 0;
let misses = 0;
const EXPIRY = 60000;
const MAX_SIZE = 50;

export function cacheGet(key: string) {
  const entry = cache.get(key);

  if (!entry) {
    misses++;
    return null;
  }

  if (Date.now() - entry.timestamp > EXPIRY) {
    cache.delete(key);
    return null;
  }

  hits++;

  cache.delete(key);
  cache.set(key, entry);

  return entry.value;
}

export function cacheSet(key: string, value: any) {
  if (cache.size >= MAX_SIZE) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }

  cache.set(key, {
    value,
    timestamp: Date.now(),
  });
}

export function cacheClear() {
  cache.clear();
}

export function cacheStats() {
  return {
    size: cache.size,
    hits,
    misses,
  };
}
