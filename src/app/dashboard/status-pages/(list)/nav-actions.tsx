"use client";

import { Link } from "@/components/common/link";
import { Feedback } from "@/components/feedback";
import { Button } from "@/components/ui/button";

export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Feedback />
      <Button size="sm" asChild>
        <Link href="/dashboard/status-pages/create">Create Status Page</Link>
      </Button>
    </div>
  );
}
