"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export function SubNav({ className, ...props }: React.ComponentProps<"div">) {
	const pathname = usePathname();
	const segments = pathname
		.replace("/landing", "")
		.split("/")
		.filter(Boolean)
		.slice(0, -1);

	return (
		<div
			className={cn("flex justify-between items-center gap-2", className)}
			{...props}
		>
			<div className="px-4 text-muted-foreground">
				{segments.map((segment, index) => (
					<Fragment key={segment}>
						<span>{segment}</span>
						{index < segments.length - 1 ? <span>{" | "}</span> : null}
					</Fragment>
				))}
			</div>
			<CopyButton
				copyText={typeof window !== "undefined" ? window.location.href : ""}
			/>
		</div>
	);
}
