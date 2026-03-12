import { ReactNode } from "react";

export function AdminPageShell({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-medium text-premium-brown">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-premium-taupe">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
