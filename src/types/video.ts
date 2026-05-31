export type VideoPlatform = 'youtube' | 'bilibili';

export interface VideoCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  platform: VideoPlatform;
  videoId: string;
  embedParams?: string;
  thumbnailUrl: string;
  duration: string;
  author: string;
  publishDate: string;
  tags: string[];
}
