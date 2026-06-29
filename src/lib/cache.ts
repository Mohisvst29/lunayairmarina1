type CacheEntry<T> = {
    data: T;
    expiresAt: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();

export function getCache<T>(key: string): T | null {
    const entry = cacheStore.get(key);
    if (!entry) {
        return null;
    }

    if (Date.now() > entry.expiresAt) {
        cacheStore.delete(key);
        return null;
    }

    return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttlMs: number) {
    cacheStore.set(key, {
        data,
        expiresAt: Date.now() + ttlMs,
    });
}

export function invalidateCache(keys: string | string[]) {
    const keyList = Array.isArray(keys) ? keys : [keys];
    keyList.forEach((key) => cacheStore.delete(key));
}

export function clearCache() {
    cacheStore.clear();
}








































