import { Link } from 'react-router-dom';
import type { Video } from '@/types/video';
import { formatDateShort } from '@/lib/formatDate';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback for broken thumbnails
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" fill="%23e5e7eb"><rect width="320" height="180"/><text x="160" y="95" text-anchor="middle" fill="%239ca3af" font-size="14">🎬 视频封面</text></svg>';
          }}
        />
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded font-mono">
          {video.duration}
        </span>
        {/* Platform badge */}
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-xs rounded font-medium text-gray-700">
          {video.platform === 'bilibili' ? '📺 B站' : '▶️ YouTube'}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors text-sm">
          {video.title}
        </h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{video.author}</span>
          <span>{formatDateShort(video.publishDate)}</span>
        </div>
      </div>
    </Link>
  );
}
