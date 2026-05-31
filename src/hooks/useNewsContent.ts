import { useContent } from './useContent';
import type { NewsArticle } from '@/types/news';

export function useNewsArticles() {
  return useContent<NewsArticle[]>('/content/news/index.json');
}

export function useNewsArticleById(articleId: string | undefined) {
  const { data: articles, loading, error } = useNewsArticles();
  const article = articleId ? (articles?.find((a) => a.id === articleId) ?? null) : null;
  return { article, loading, error };
}
