import { Link } from 'react-router-dom';
import type { BookChapter } from '@/types/book';

interface ChapterNavigationProps {
  prevChapter: BookChapter | null;
  nextChapter: BookChapter | null;
}

export default function ChapterNavigation({ prevChapter, nextChapter }: ChapterNavigationProps) {
  if (!prevChapter && !nextChapter) return null;

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
      <div>
        {prevChapter ? (
          <Link
            to={`/book/${prevChapter.id}`}
            className="group flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-right">
              <div className="text-xs text-gray-400">上一章</div>
              <div className="text-sm font-medium">{prevChapter.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div>
        {nextChapter ? (
          <Link
            to={`/book/${nextChapter.id}`}
            className="group flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <div className="text-left">
              <div className="text-xs text-gray-400">下一章</div>
              <div className="text-sm font-medium">{nextChapter.title}</div>
            </div>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
