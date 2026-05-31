interface EmptyStateProps {
  icon?: string;
  message?: string;
}

export default function EmptyState({ icon = '📭', message = '暂无内容' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
