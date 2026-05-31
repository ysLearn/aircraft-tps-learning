import { useState, useMemo } from 'react';
import { useNewsArticles } from '@/hooks/useNewsContent';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import NewsCard from '@/components/news/NewsCard';
import NewsFilter from '@/components/news/NewsFilter';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Breadcrumb from '@/components/ui/Breadcrumb';

type FilterValue = 'all' | 'domestic' | 'international';

export default function NewsListPage() {
  useDocumentTitle('最新进展');
  const { data: articles, loading, error } = useNewsArticles();
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (activeFilter === 'all') return articles;
    return articles.filter((a) => a.source === activeFilter);
  }, [articles, activeFilter]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '最新进展' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📰 最新进展</h1>
        <p className="text-gray-500">
          追踪国内外飞行器热防护领域的最新研究成果、技术突破和行业动态。
          {articles && <span> 共 {articles.length} 篇文章。</span>}
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <NewsFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        {articles && (
          <span className="text-sm text-gray-500">
            {filteredArticles.length} 条{activeFilter !== 'all' ? (activeFilter === 'domestic' ? '国内' : '国际') : ''}资讯
          </span>
        )}
      </div>

      {/* Article List */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState icon="📭" message="暂无相关文章" />
      )}
    </div>
  );
}
