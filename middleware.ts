import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, type Locale } from "./i18n";

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "always" as const,
};

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
