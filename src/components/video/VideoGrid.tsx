import type { Video } from '@/types/video';
import VideoCard from './VideoCard';
import EmptyState from '@/components/ui/EmptyState';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return <EmptyState icon="🎬" message="暂无符合条件的视频" />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
