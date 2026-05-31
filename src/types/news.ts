export type NewsSource = 'domestic' | 'international';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  contentFile: string;
  source: NewsSource;
  sourceName: string;
  publishDate: string;
  imageUrl?: string;
  tags: string[];
  originalUrl?: string;
}
