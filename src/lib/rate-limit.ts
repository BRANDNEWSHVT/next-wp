const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

export function rateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: MAX_REQUESTS - record.count };
}

export function cleanupRateLimitMap(): void {
  const now = Date.now();
  const keys = Array.from(rateLimitMap.keys());
  for (const ip of keys) {
    const record = rateLimitMap.get(ip);
    if (record && now - record.timestamp > WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimitMap, WINDOW_MS);
}
