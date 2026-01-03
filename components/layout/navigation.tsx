"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Radio, Settings, FileText } from "lucide-react";

interface NavigationProps {
  className?: string;
  onNavigate?: () => void;
}

export function Navigation({ className, onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navigation");

  const navItems = [
    { href: "/live", label: t("liveDashboard"), icon: Radio },
    { href: "/setup", label: t("setup"), icon: Settings },
    { href: "/report", label: t("report"), icon: FileText },
  ];

  return (
    <nav className={cn("flex gap-2", className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const href = `/${locale}${item.href}`;
        const isActive = pathname.includes(item.href);
        return (
          <Link
            key={item.href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]",
              isActive
                ? "bg-primary text-white"
                : "text-foreground-muted hover:text-foreground hover:bg-gray-50"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

