import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBoxProps {
  title?: string;
  message: string;
  variant?: "default" | "warning" | "danger";
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AlertBox({
  title,
  message,
  variant = "default",
  action,
}: AlertBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-sm",
        variant === "danger" && "border-accent-pink bg-accent-pink/10 shadow-accent-pink/10",
        variant === "warning" && "border-accent-orange bg-accent-orange/10 shadow-accent-orange/10",
        variant === "default" && "border-gray-300 bg-gray-50"
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className={cn(
            "h-5 w-5 mt-0.5",
            variant === "danger" && "text-accent-pink",
            variant === "warning" && "text-accent-orange"
          )}
        />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1 text-sm">{title}</h4>
          )}
          <p className="text-sm text-foreground-muted">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-3 text-sm text-primary hover:underline"
            >
              {action.label} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

