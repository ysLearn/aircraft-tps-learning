import { useContent } from './useContent';
import type { BookTopic, BookChapter } from '@/types/book';

interface BookIndexData {
  topics: BookTopic[];
  chapters: BookChapter[];
}

export function useBookContent() {
  return useContent<BookIndexData>('/content/book/index.json');
}

export function useBookChapter(chapterId: string | undefined) {
  const { data, loading, error } = useBookContent();

  if (!chapterId) {
    return { chapter: null, prevChapter: null, nextChapter: null, topic: null, loading: false, error: null };
  }

  const chapter = data?.chapters.find((c) => c.id === chapterId) ?? null;

  // Find topic
  const topic = chapter ? (data?.topics.find((t) => t.id === chapter.topicId) ?? null) : null;

  // Find prev/next chapters
  let prevChapter: BookChapter | null = null;
  let nextChapter: BookChapter | null = null;

  if (chapter && data) {
    const allChapters = [...data.chapters].sort((a, b) => a.order - b.order);
    const idx = allChapters.findIndex((c) => c.id === chapterId);
    if (idx > 0) prevChapter = allChapters[idx - 1];
    if (idx < allChapters.length - 1) nextChapter = allChapters[idx + 1];
  }

  return { chapter, prevChapter, nextChapter, topic, loading, error };
}
