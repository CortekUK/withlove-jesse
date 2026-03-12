import { ReactNode } from "react";

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 rounded-xl border-2 border-dashed border-sand-200 bg-premium-bg text-center">
      <div className="w-14 h-14 rounded-full bg-premium-soft flex items-center justify-center mb-4 text-premium-taupe">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-medium text-premium-brown">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-premium-taupe max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
