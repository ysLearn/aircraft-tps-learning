import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  to: string;
  features: string[];
  color: 'blue' | 'orange' | 'green';
}

const colorStyles = {
  blue: {
    iconBg: 'bg-primary-100',
    iconBorder: 'border-primary-200',
    badge: 'bg-primary-100 text-primary-700',
    link: 'text-primary-600 hover:text-primary-700',
    linkBg: 'hover:bg-primary-50',
    border: 'hover:border-primary-300',
  },
  orange: {
    iconBg: 'bg-accent-100',
    iconBorder: 'border-accent-200',
    badge: 'bg-accent-100 text-accent-700',
    link: 'text-accent-600 hover:text-accent-700',
    linkBg: 'hover:bg-accent-50',
    border: 'hover:border-accent-300',
  },
  green: {
    iconBg: 'bg-emerald-100',
    iconBorder: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    link: 'text-emerald-600 hover:text-emerald-700',
    linkBg: 'hover:bg-emerald-50',
    border: 'hover:border-emerald-300',
  },
};

export default function ModuleCard({ icon, title, description, to, features, color }: ModuleCardProps) {
  const styles = colorStyles[color];

  return (
    <Card hover className={`h-full transition-all ${styles.border}`}>
      <Link to={to} className="block p-6 h-full">
        <div className={`w-14 h-14 ${styles.iconBg} border ${styles.iconBorder} rounded-xl flex items-center justify-center text-2xl mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {features.map((f) => (
            <span key={f} className={`px-2.5 py-1 ${styles.badge} rounded-full text-xs font-medium`}>
              {f}
            </span>
          ))}
        </div>
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${styles.link} transition-colors`}>
          进入学习
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </Card>
  );
}
