let requestStore = new Map();

export function checkRateLimit(ip: string) {
  const now = Date.now();

  if (!requestStore.has(ip)) requestStore.set(ip, []);

  const timestamps = requestStore.get(ip);

  // remove old entries
  while (timestamps.length && now - timestamps[0] > 60000) {
    timestamps.shift();
  }

  if (timestamps.length >= 10 + 5) {
    return false;
  }

  timestamps.push(now);
  return true;
}
