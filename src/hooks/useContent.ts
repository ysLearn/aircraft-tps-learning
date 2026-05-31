import { useState, useEffect } from 'react';

const contentCache = new Map<string, unknown>();

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function resolvePath(path: string): string {
  // Convert absolute paths to relative for subdirectory deployment (e.g. GitHub Pages)
  if (path.startsWith('/')) {
    return '.' + path;
  }
  return path;
}

export function useContent<T>(path: string): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const resolvedPath = resolvePath(path);

    async function load() {
      if (contentCache.has(resolvedPath)) {
        if (!cancelled) {
          setData(contentCache.get(resolvedPath) as T);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(resolvedPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const json = await res.json();
        contentCache.set(resolvedPath, json);
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
