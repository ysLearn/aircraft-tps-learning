import { useState } from 'react';
import type { VideoPlatform } from '@/types/video';

interface VideoPlayerProps {
  platform: VideoPlatform;
  videoId: string;
  embedParams?: string;
  title: string;
}

function getEmbedUrl(platform: VideoPlatform, videoId: string, embedParams?: string): string {
  if (platform === 'youtube') {
    const params = embedParams || 'rel=0';
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  }
  // Bilibili
  const params = embedParams || 'danmaku=0&autoplay=0';
  return `https://player.bilibili.com/player.html?bvid=${videoId}&${params}&as_wide=1&high_quality=1`;
}

function getDirectUrl(platform: VideoPlatform, videoId: string): string {
  if (platform === 'youtube') {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return `https://www.bilibili.com/video/${videoId}`;
}

export default function VideoPlayer({ platform, videoId, embedParams, title }: VideoPlayerProps) {
  const [loadError, setLoadError] = useState(false);

  if (loadError) {
    return (
      <div className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-4">
        <span className="text-4xl">⚠️</span>
        <p className="text-gray-500">视频加载失败，可能被浏览器阻止</p>
        <a
          href={getDirectUrl(platform, videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
        >
          在 {platform === 'bilibili' ? 'B站' : 'YouTube'} 中打开
        </a>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={getEmbedUrl(platform, videoId, embedParams)}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={() => setLoadError(true)}
      />
    </div>
  );
}
