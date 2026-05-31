interface FeaturedItem {
  title: string;
  description: string;
  link: string;
  tag: string;
}

interface FeaturedSectionProps {
  title: string;
  items: FeaturedItem[];
}

export default function FeaturedSection({ title, items }: FeaturedSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary-500 rounded-full" />
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs mb-3">
              {item.tag}
            </span>
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
