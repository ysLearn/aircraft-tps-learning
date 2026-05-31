import { useParams } from 'react-router-dom';
import { useNewsArticleById } from '@/hooks/useNewsContent';
import { useMarkdown } from '@/hooks/useMarkdown';
import ChapterRenderer from '@/components/book/ChapterRenderer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import TagBadge from '@/components/ui/TagBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { formatDate } from '@/lib/formatDate';

export default function NewsArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const { article, loading: articleLoading, error: articleError } = useNewsArticleById(articleId);
  const { content: mdContent, loading: mdLoading, error: mdError } = useMarkdown(
    article?.contentFile ?? ''
  );

  if (articleLoading) return <LoadingSpinner />;
  if (articleError) return <ErrorMessage message={articleError} />;
  if (!article) return <ErrorMessage message="文章未找到" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: '首页', path: '/' },
          { label: '最新进展', path: '/news' },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              article.source === 'domestic'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {article.source === 'domestic' ? '🇨🇳 国内进展' : '🌍 国际前沿'}
          </span>
          <span className="text-sm text-gray-500">{article.sourceName}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(article.publishDate)}
          </span>
          {article.originalUrl && (
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary-600 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              原文链接
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {article.tags.map((tag) => (
            <TagBadge key={tag} label={tag} variant="primary" />
          ))}
        </div>
      </header>

      {/* Article Body */}
      {mdLoading && <LoadingSpinner />}
      {mdError && <ErrorMessage message={`加载文章内容失败: ${mdError}`} />}
      {mdContent && <ChapterRenderer content={mdContent} />}

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          来源：{article.sourceName} · 发布时间：{formatDate(article.publishDate)}
          {article.originalUrl && (
            <>
              {' · '}
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                查看原文
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  );
}
