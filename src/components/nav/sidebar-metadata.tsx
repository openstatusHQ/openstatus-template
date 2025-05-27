import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  EmptyStateContainer,
  EmptyStateDescription,
} from "@/components/content/empty-state";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type SidebarMetadataProps = {
  label: string;
  items?: {
    label: string;
    value: React.ReactNode;
    isNested?: boolean;
  }[];
};

export function SidebarMetadata({ label, items }: SidebarMetadataProps) {
  return (
    <SidebarGroup className="p-0">
      <Collapsible defaultOpen className="group/collapsible border-b">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-none h-9"
        >
          <CollapsibleTrigger>
            {label}{" "}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="border-t">
            {items && items.length > 0 ? (
              <SidebarMetadataTable items={items} />
            ) : (
              <EmptyStateContainer className="m-2">
                <EmptyStateDescription>No {label}</EmptyStateDescription>
              </EmptyStateContainer>
            )}
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}

function SidebarMetadataTable({
  items,
}: {
  items: {
    label: string;
    value: React.ReactNode;
    isNested?: boolean;
    tooltip?: string;
  }[];
}) {
  return (
    <Table>
      <TableHeader className="sr-only">
        <TableRow>
          <TableHead className="w-24">Label</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="w-24 text-muted-foreground border-r">
              <div className="truncate min-w-[80px] max-w-[80px]">
                {item.isNested ? "└ " : ""}
                {item.label}
              </div>
            </TableCell>
            {/* <TableCell className="font-mono truncate max-w-0">
              {item.value}
            </TableCell> */}
            <SidebarMetadataTableCell className="font-mono truncate max-w-0">
              {item.value}
            </SidebarMetadataTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SidebarMetadataTableCell({
  ...props
}: React.ComponentProps<typeof TableCell>) {
  const ref = React.useRef<HTMLTableCellElement>(null);
  const [isTruncated, setIsTruncated] = React.useState(false);
  // const { copy } = useCopyToClipboard();

  React.useEffect(() => {
    if (ref.current) {
      setIsTruncated(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <TableCell {...props} ref={ref}>
      <TooltipProvider>
        {isTruncated ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block truncate">{props.children}</span>
            </TooltipTrigger>
            <TooltipContent>{props.children}</TooltipContent>
          </Tooltip>
        ) : (
          props.children
        )}
      </TooltipProvider>
    </TableCell>
  );
}
