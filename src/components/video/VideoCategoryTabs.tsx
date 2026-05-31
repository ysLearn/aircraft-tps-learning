import { cn } from '@/lib/cn';
import type { VideoCategory } from '@/types/video';

interface VideoCategoryTabsProps {
  categories: VideoCategory[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function VideoCategoryTabs({ categories, activeCategory, onSelect }: VideoCategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeCategory === cat.id
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          )}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
