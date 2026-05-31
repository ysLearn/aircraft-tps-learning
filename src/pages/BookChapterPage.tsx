import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useBookChapter, useBookContent } from '@/hooks/useBookContent';
import { useMarkdown } from '@/hooks/useMarkdown';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import BookTOC from '@/components/book/BookTOC';
import ChapterRenderer from '@/components/book/ChapterRenderer';
import ChapterNavigation from '@/components/book/ChapterNavigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import TagBadge from '@/components/ui/TagBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function BookChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { chapter, prevChapter, nextChapter, topic, loading: chapterLoading } = useBookChapter(chapterId);
  const { data: bookData } = useBookContent();
  const { content: mdContent, loading: mdLoading, error: mdError } = useMarkdown(
    chapter?.contentFile ?? ''
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useDocumentTitle(chapter?.title);

  if (chapterLoading) return <LoadingSpinner />;
  if (!chapter) return <ErrorMessage message="章节未找到" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: '首页', path: '/' },
          { label: '书籍学习', path: '/book' },
          { label: chapter.title },
        ]}
      />

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          {bookData && <BookTOC topics={bookData.topics} chapters={bookData.chapters} />}
        </aside>

        {/* Mobile TOC */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-primary-700 transition-colors"
            aria-label="目录"
          >
            📑
          </button>
        </div>

        {sidebarOpen && bookData && (
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
              <BookTOC topics={bookData.topics} chapters={bookData.chapters} />
            </div>
          </div>
        )}

        {/* Chapter Content */}
        <article className="flex-1 min-w-0">
          {/* Chapter Header */}
          <header className="mb-8">
            {topic && (
              <span className="text-sm text-primary-600 font-medium mb-2 block">
                {topic.icon} {topic.title}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {chapter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                预计阅读 {chapter.estimatedMinutes} 分钟
              </span>
              <div className="flex flex-wrap gap-1.5">
                {chapter.tags.map((tag) => (
                  <TagBadge key={tag} label={tag} variant="primary" />
                ))}
              </div>
            </div>
          </header>

          {/* Chapter Body */}
          {mdLoading && <LoadingSpinner />}
          {mdError && <ErrorMessage message={`加载章节内容失败: ${mdError}`} />}
          {mdContent && <ChapterRenderer content={mdContent} />}

          {/* Chapter Navigation */}
          <ChapterNavigation prevChapter={prevChapter} nextChapter={nextChapter} />
        </article>
      </div>
    </div>
  );
}
