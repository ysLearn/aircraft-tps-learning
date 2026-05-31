import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types/news';
import { formatDate } from '@/lib/formatDate';
import TagBadge from '@/components/ui/TagBadge';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      to={`/news/${article.id}`}
      className="group block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail placeholder */}
        {article.imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Source badges */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                article.source === 'domestic'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {article.source === 'domestic' ? '🇨🇳 国内' : '🌍 国际'}
            </span>
            <span className="text-xs text-gray-400">{article.sourceName}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">{formatDate(article.publishDate)}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-primary-700 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{article.summary}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} label={tag} size="sm" />
            ))}
          </div>
        </div>

        {/* Arrow */}
        <svg
          className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
