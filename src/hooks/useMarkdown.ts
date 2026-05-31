import { useState, useEffect } from 'react';

const mdCache = new Map<string, string>();

interface UseMarkdownResult {
  content: string | null;
  loading: boolean;
  error: string | null;
}

export function useMarkdown(path: string): UseMarkdownResult {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!path) {
        if (!cancelled) {
          setContent(null);
          setLoading(false);
        }
        return;
      }

      if (mdCache.has(path)) {
        if (!cancelled) {
          setContent(mdCache.get(path)!);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const text = await res.text();
        mdCache.set(path, text);
        if (!cancelled) {
          setContent(text);
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

  return { content, loading, error };
}
