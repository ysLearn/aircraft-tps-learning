import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import type { BookTopic, BookChapter } from '@/types/book';
import { cn } from '@/lib/cn';

interface BookTOCProps {
  topics: BookTopic[];
  chapters: BookChapter[];
}

export default function BookTOC({ topics, chapters }: BookTOCProps) {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(() => {
    // Auto-expand the topic containing the active chapter
    if (chapterId) {
      const activeChapter = chapters.find((c) => c.id === chapterId);
      if (activeChapter) return new Set([activeChapter.topicId]);
    }
    // Default: expand the first topic
    return topics.length > 0 ? new Set([topics[0].id]) : new Set();
  });

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const getChaptersByTopic = (topicId: string) =>
    chapters
      .filter((c) => c.topicId === topicId)
      .sort((a, b) => a.order - b.order);

  return (
    <nav className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-20">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
          目录导航
        </h3>
        <ul className="space-y-1">
          {topics.map((topic) => {
            const isExpanded = expandedTopics.has(topic.id);
            const topicChapters = getChaptersByTopic(topic.id);
            const progressCount = topicChapters.filter((c) => {
              // Simple progress indicator — in a real app this would be stored
              return c.order <= 4;
            }).length;

            return (
              <li key={topic.id}>
                {/* Topic Header */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-base">{topic.icon}</span>
                  <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {topic.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {progressCount}/{topicChapters.length}
                  </span>
                  <svg
                    className={cn(
                      'w-4 h-4 text-gray-400 transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Chapter List */}
                {isExpanded && (
                  <ul className="ml-7 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                    {topicChapters.map((chapter) => {
                      const isActive = chapter.id === chapterId;
                      return (
                        <li key={chapter.id}>
                          <Link
                            to={`/book/${chapter.id}`}
                            className={cn(
                              'block px-3 py-1.5 rounded-lg text-sm transition-colors',
                              isActive
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{chapter.title}</span>
                              <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                {chapter.estimatedMinutes}分钟
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
