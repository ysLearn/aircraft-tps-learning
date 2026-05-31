import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Handle redirect from 404.html (GitHub Pages SPA fallback)
const savedPath = sessionStorage.getItem('redirect');
if (savedPath) {
  sessionStorage.removeItem('redirect');
  // Convert the path to hash-based route
  window.location.hash = savedPath;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
