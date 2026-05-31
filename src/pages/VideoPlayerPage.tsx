import { useParams } from 'react-router-dom';
import { useVideoById } from '@/hooks/useVideoContent';
import VideoPlayer from '@/components/video/VideoPlayer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import TagBadge from '@/components/ui/TagBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { formatDate } from '@/lib/formatDate';

export default function VideoPlayerPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const { video, loading, error } = useVideoById(videoId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!video) return <ErrorMessage message="视频未找到" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: '首页', path: '/' },
          { label: '视频学习', path: '/video' },
          { label: video.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <VideoPlayer
            platform={video.platform}
            videoId={video.videoId}
            embedParams={video.embedParams}
            title={video.title}
          />

          {/* Video Info */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {video.author}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(video.publishDate)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {video.duration}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {video.platform === 'bilibili' ? '📺 Bilibili' : '▶️ YouTube'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {video.tags.map((tag) => (
                <TagBadge key={tag} label={tag} variant="primary" />
              ))}
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{video.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar - could show related videos in future */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">视频信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">作者</dt>
                <dd className="text-gray-900 font-medium">{video.author}</dd>
              </div>
              <div>
                <dt className="text-gray-500">发布日期</dt>
                <dd className="text-gray-900">{formatDate(video.publishDate)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">时长</dt>
                <dd className="text-gray-900">{video.duration}</dd>
              </div>
              <div>
                <dt className="text-gray-500">平台</dt>
                <dd className="text-gray-900">
                  {video.platform === 'bilibili' ? 'Bilibili (B站)' : 'YouTube'}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">标签</dt>
                <dd className="flex flex-wrap gap-1 mt-1">
                  {video.tags.map((tag) => (
                    <TagBadge key={tag} label={tag} size="sm" />
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
