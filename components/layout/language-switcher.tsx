"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { locales } from "@/i18n";
import { cn } from "@/lib/utils";

const languageNames: Record<string, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: string) => {
    // Replace locale in pathname
    const segments = pathname.split("/");
    if (segments[1] && locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/");
    router.push(newPath);
    router.refresh();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-gray-50 border border-gray-200 min-h-[44px]"
      >
        <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{languageNames[locale] || locale.toUpperCase()}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={cn(
                  "w-full text-left px-3 sm:px-4 py-2.5 text-sm transition-colors min-h-[44px]",
                  locale === loc
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-gray-50"
                )}
              >
                {languageNames[loc] || loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

