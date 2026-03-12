import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  label,
  variant = "default",
}: {
  status?: boolean;
  label?: string;
  variant?: "default" | "muted";
}) {
  const isActive = status ?? true;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "muted" && "bg-sand-100 text-sand-600",
        variant === "default" &&
          (isActive
            ? "bg-green-100 text-green-800"
            : "bg-sand-200 text-sand-600")
      )}
    >
      {label ?? (isActive ? "Active" : "Inactive")}
    </span>
  );
}
