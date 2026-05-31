import { cn } from '@/lib/cn';

type FilterValue = 'all' | 'domestic' | 'international';

interface NewsFilterProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

const filters: { value: FilterValue; label: string; icon: string }[] = [
  { value: 'all', label: '全部', icon: '📋' },
  { value: 'domestic', label: '国内进展', icon: '🇨🇳' },
  { value: 'international', label: '国际前沿', icon: '🌍' },
];

export default function NewsFilter({ activeFilter, onFilterChange }: NewsFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onFilterChange(f.value)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeFilter === f.value
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          )}
        >
          <span className="mr-1.5">{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
}
