"use client";

import { Link } from "@/components/common/link";
import { NavFeedback } from "@/components/nav/nav-feedback";
import { Button } from "@/components/ui/button";

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <NavFeedback />
      <Button size="sm" asChild>
        <Link href="/dashboard/status-pages/create">Create Status Page</Link>
      </Button>
    </div>
  );
}
