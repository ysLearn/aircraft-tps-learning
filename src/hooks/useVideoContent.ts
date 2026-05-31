import { useContent } from './useContent';
import type { Video, VideoCategory } from '@/types/video';

interface VideoCategoriesData {
  categories: VideoCategory[];
}

export function useVideoCategories() {
  return useContent<VideoCategoriesData>('/content/video/categories.json');
}

export function useVideos() {
  return useContent<Video[]>('/content/video/index.json');
}

export function useVideoById(videoId: string | undefined) {
  const { data: videos, loading, error } = useVideos();
  const video = videoId ? (videos?.find((v) => v.id === videoId) ?? null) : null;
  return { video, loading, error };
}
