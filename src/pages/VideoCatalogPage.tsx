import { useState, useMemo } from 'react';
import { useVideos, useVideoCategories } from '@/hooks/useVideoContent';
import VideoGrid from '@/components/video/VideoGrid';
import VideoCategoryTabs from '@/components/video/VideoCategoryTabs';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function VideoCatalogPage() {
  useDocumentTitle('视频学习');
  const { data: videos, loading: videosLoading, error: videosError } = useVideos();
  const { data: categoriesData } = useVideoCategories();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    let result = videos;

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((v) => v.categoryId === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          v.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [videos, activeCategory, searchQuery]);

  if (videosLoading) return <LoadingSpinner />;
  if (videosError) return <ErrorMessage message={videosError} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '视频学习' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎬 视频学习</h1>
        <p className="text-gray-500">
          精选国内外优质教学视频与实验演示，包含基础理论、实验演示、工程案例和专家讲座等分类内容。
          {videos && <span> 共 {videos.length} 个视频。</span>}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索视频..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8">
        {categoriesData && (
          <VideoCategoryTabs
            categories={[
              { id: 'all', name: '全部', icon: '📺' },
              ...categoriesData.categories.filter((c) => c.id !== 'all'),
            ]}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-gray-500">
          搜索 "{searchQuery}"：找到 {filteredVideos.length} 个结果
        </div>
      )}

      {/* Video Grid */}
      <VideoGrid videos={filteredVideos} />
    </div>
  );
}
