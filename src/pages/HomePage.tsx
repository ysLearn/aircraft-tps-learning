import HeroBanner from '@/components/home/HeroBanner';
import ModuleCard from '@/components/home/ModuleCard';
import FeaturedSection from '@/components/home/FeaturedSection';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const modules = [
  {
    icon: '📚',
    title: '书籍学习',
    description: '系统化的飞行器结构防隔热理论知识体系，按章节循序渐进，构建完整的学科知识框架。',
    to: '/book',
    color: 'blue' as const,
    features: ['结构力学', '热防护理论', '材料科学', '工程设计'],
  },
  {
    icon: '🎬',
    title: '视频学习',
    description: '精选国内外优质教学视频与实验演示，直观理解复杂概念，提升学习效率。',
    to: '/video',
    color: 'orange' as const,
    features: ['基础理论', '实验演示', '工程案例', '专家讲座'],
  },
  {
    icon: '📰',
    title: '最新进展',
    description: '追踪国内外飞行器热防护领域的最新研究成果与技术突破，保持知识前沿性。',
    to: '/news',
    color: 'green' as const,
    features: ['国内进展', '国际前沿', '学术论文', '技术动态'],
  },
];

const featuredItems = [
  {
    title: '热传导基本原理与数值计算方法',
    description: '介绍傅里叶导热定律、一维/多维稳态导热分析及有限差分法的工程应用。',
    link: '#/book/thermal-conduction-basics',
    tag: '📚 书籍',
  },
  {
    title: '航天器再入气动热环境模拟实验',
    description: '观看高超声速飞行器再入过程中的气动加热现象及地面模拟实验方法。',
    link: '#/video/aerodynamic-heating',
    tag: '🎬 视频',
  },
  {
    title: 'NASA新型TPS材料取得重大突破',
    description: 'NASA艾姆斯研究中心开发出新型轻质烧蚀防热材料，可承受更高热流密度。',
    link: '#/news/nasa-new-tps-material',
    tag: '📰 新闻',
  },
  {
    title: '高温合金的蠕变行为与本构模型',
    description: '深入探讨镍基高温合金在高温载荷下的蠕变机制及其本构方程建模方法。',
    link: '#/book/creep-behavior-superalloy',
    tag: '📚 书籍',
  },
  {
    title: '发汗冷却技术原理与工程应用',
    description: '讲解发汗冷却的工作机理、多孔介质流动传热特性及在液体火箭发动机中的应用。',
    link: '#/video/transpiration-cooling',
    tag: '🎬 视频',
  },
  {
    title: '我国可重复使用航天器热防护系统研制进展',
    description: '中国航天科技集团在可重复使用热防护系统领域的最新研究成果与应用情况。',
    link: '#/news/china-reusable-tps',
    tag: '📰 新闻',
  },
];

export default function HomePage() {
  useDocumentTitle();
  return (
    <div>
      <HeroBanner />

      {/* Module Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid gap-6 md:grid-cols-3">
          {modules.map((mod) => (
            <ModuleCard key={mod.to} {...mod} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedSection title="精选内容" items={featuredItems} />
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary-50 border-t border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            开始你的学习之旅
          </h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            从基础理论到前沿技术，循序渐进地掌握飞行器结构防隔热知识体系
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#/book"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
            >
              从书籍开始
            </a>
            <a
              href="#/news"
              className="px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
            >
              查看最新进展
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
