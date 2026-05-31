import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>🛩️</span>
            <span>{SITE_NAME} © {new Date().getFullYear()}</span>
          </div>
          <p className="text-gray-400 text-sm">{SITE_DESCRIPTION}</p>
        </div>
      </div>
    </footer>
  );
}
