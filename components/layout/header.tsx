"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3 md:space-x-6">
          <Image
            src="/logo-travis.png"
            alt="TRAVIS Logo"
            width={150}
            height={50}
            className="h-8 w-auto flex-shrink-0 sm:h-10 md:h-12"
            priority
          />
          <Navigation className="hidden md:flex" />
        </div>
        <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2 md:space-x-4">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Button variant="ghost" size="sm" className="hidden min-h-[44px] min-w-[44px] sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden min-h-[44px] min-w-[44px] sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="min-h-[44px] min-w-[44px] md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="container mx-auto space-y-3 px-4 py-4">
            <div className="mb-3">
              <LanguageSwitcher />
            </div>
            <Navigation className="flex flex-col" onNavigate={() => setIsMobileMenuOpen(false)} />
            <div className="flex items-center justify-between gap-2 border-t border-gray-200 pt-3">
              <Button variant="ghost" size="sm" className="min-h-[44px] flex-1">
                <Bell className="mr-2 h-5 w-5" />
                <span className="text-sm">Notifications</span>
              </Button>
              <Button variant="ghost" size="sm" className="min-h-[44px] flex-1">
                <User className="mr-2 h-5 w-5" />
                <span className="text-sm">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
