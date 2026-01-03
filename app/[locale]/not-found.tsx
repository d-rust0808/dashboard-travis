import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-8 text-foreground-muted">Page not found</p>
      <Link href="/vi/live">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
