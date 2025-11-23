import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <Button size="sm" asChild>
        <Link href="/dashboard/overview">Overview</Link>
      </Button>
    </div>
  );
}
