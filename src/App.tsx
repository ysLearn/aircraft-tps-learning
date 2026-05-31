import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import BookIndexPage from '@/pages/BookIndexPage';
import BookChapterPage from '@/pages/BookChapterPage';
import VideoCatalogPage from '@/pages/VideoCatalogPage';
import VideoPlayerPage from '@/pages/VideoPlayerPage';
import NewsListPage from '@/pages/NewsListPage';
import NewsArticlePage from '@/pages/NewsArticlePage';
import NotFoundPage from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="book" element={<BookIndexPage />} />
          <Route path="book/:chapterId" element={<BookChapterPage />} />
          <Route path="video" element={<VideoCatalogPage />} />
          <Route path="video/:videoId" element={<VideoPlayerPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:articleId" element={<NewsArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
