import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookContent } from '@/hooks/useBookContent';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import BookTOC from '@/components/book/BookTOC';
import TagBadge from '@/components/ui/TagBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function BookIndexPage() {
  useDocumentTitle('书籍学习');
  const { data, loading, error } = useBookContent();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || !data.topics.length) return <ErrorMessage message="暂无书籍内容" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: '首页', path: '/' }, { label: '书籍学习' }]} />

      <div className="flex gap-8">
        {/* Sidebar - desktop: visible always, mobile: overlay */}
        <aside className="hidden lg:block">
          <BookTOC topics={data.topics} chapters={data.chapters} />
        </aside>

        {/* Mobile TOC toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-primary-700 transition-colors"
            aria-label="目录"
          >
            📑
          </button>
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">目录导航</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <BookTOC topics={data.topics} chapters={data.chapters} />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 书籍学习</h1>
            <p className="text-gray-500">
              系统化学习飞行器结构防隔热理论知识，按章节循序渐进地掌握核心概念与分析方法。
              共 {data.topics.length} 个主题，{data.chapters.length} 个章节。
            </p>
          </div>

          <div className="space-y-8">
            {data.topics.map((topic) => {
              const topicChapters = data.chapters
                .filter((c) => c.topicId === topic.id)
                .sort((a, b) => a.order - b.order);

              return (
                <section key={topic.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{topic.title}</h2>
                      <p className="text-gray-500 text-sm">{topic.description}</p>
                    </div>
                    <span className="text-sm text-gray-400">{topicChapters.length} 章节</span>
                  </div>

                  <div className="grid gap-2 ml-13 sm:grid-cols-2">
                    {topicChapters.map((chapter) => (
                      <Link
                        key={chapter.id}
                        to={`/book/${chapter.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm group-hover:text-primary-700 transition-colors truncate">
                            {chapter.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {chapter.tags.slice(0, 2).map((tag) => (
                              <TagBadge key={tag} label={tag} size="sm" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-3">
                          <span className="text-xs text-gray-400">{chapter.estimatedMinutes}分钟</span>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
