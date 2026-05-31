import { useState, useEffect } from 'react';

const contentCache = new Map<string, unknown>();

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useContent<T>(path: string): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (contentCache.has(path)) {
        if (!cancelled) {
          setData(contentCache.get(path) as T);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const json = await res.json();
        contentCache.set(path, json);
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '未知错误');
          setLoading(false);
        }
      }
    }

    setLoading(true);
    setError(null);
    load();

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}
