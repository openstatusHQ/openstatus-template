import { type StatusReport, statusReports } from "@/data/status-reports";
import { type Maintenance, maintenances } from "@/data/maintenances";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/formatter";
import {
  format,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { UTCDate } from "@date-fns/utc";

const STATUS_LABELS = {
  operational: "Resolved",
  monitoring: "Monitoring",
  identified: "Identified",
  investigating: "Investigating",
};

// TODO: move to page level
export function StatusEventsTabs() {
  return (
    <Tabs defaultValue="reports" className="gap-4">
      <TabsList>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
      </TabsList>
      <TabsContent value="reports" className="flex flex-col gap-4">
        {statusReports.map((report) => (
          <StatusEvent key={report.id}>
            <StatusEventAside>
              <span className="font-medium text-foreground/80">
                {formatDate(report.startedAt, { month: "short" })}
              </span>
            </StatusEventAside>
            <Link href="/status-page/events/report" className="rounded-lg">
              <StatusEventContent>
                <StatusEventTitle>{report.name}</StatusEventTitle>
                <StatusEventAffected className="flex flex-wrap gap-1">
                  {report.affected.map((affected) => (
                    <Badge
                      key={affected}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {affected}
                    </Badge>
                  ))}
                </StatusEventAffected>
                <StatusEventTimelineReport updates={report.updates} />
              </StatusEventContent>
            </Link>
          </StatusEvent>
        ))}
      </TabsContent>
      <TabsContent value="maintenances" className="flex flex-col gap-4">
        {maintenances.map((maintenance) => {
          const isFuture = maintenance.startDate > new Date();
          return (
            <StatusEvent key={maintenance.id}>
              <StatusEventAside>
                <span className="font-medium text-foreground/80">
                  {formatDate(maintenance.startDate, { month: "short" })}
                </span>
                {isFuture ? (
                  <span className="text-info text-sm">Upcoming</span>
                ) : null}
              </StatusEventAside>
              <Link
                href="/status-page/events/maintenance"
                className="rounded-lg"
              >
                <StatusEventContent>
                  <StatusEventTitle>{maintenance.title}</StatusEventTitle>
                  <StatusEventAffected className="flex flex-wrap gap-1">
                    {maintenance.affected.map((affected) => (
                      <Badge
                        key={affected}
                        variant="outline"
                        className="text-[10px]"
                      >
                        {affected}
                      </Badge>
                    ))}
                  </StatusEventAffected>
                  <StatusEventTimelineMaintenance maintenance={maintenance} />
                </StatusEventContent>
              </Link>
            </StatusEvent>
          );
        })}
      </TabsContent>
    </Tabs>
  );
}

// TODO: rename file to status-event and move the `StatusEvents` component to the page level.

export function StatusEvent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export function StatusEventContent({
  className,
  hoverable = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  hoverable?: boolean;
}) {
  // TODO: add Link
  return (
    <div
      data-hoverable={hoverable}
      className={cn(
        "group flex flex-col gap-2 border border-transparent rounded-lg px-3 -mx-3 py-2 -my-2",
        "data-[hoverable=true]:hover:cursor-pointer data-[hoverable=true]:hover:bg-muted/50 data-[hoverable=true]:hover:border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatusEventTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("font-medium", className)} {...props}>
      {children}
    </div>
  );
}

// TODO: affected monitors
export function StatusEventAffected({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function StatusEventAside({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="lg:absolute lg:-left-32 lg:top-0 lg:h-full">
      <div
        className={cn(
          "flex flex-col gap-1 lg:sticky lg:top-0 lg:left-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function StatusEventTimelineReport({
  className,
  updates,
  ...props
}: React.ComponentProps<"div"> & {
  updates: StatusReport["updates"];
}) {
  const startedAt = new Date(updates[0].date);
  const endedAt = new Date(updates[updates.length - 1].date);
  const duration = formatDistanceStrict(startedAt, endedAt);
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {/* TODO: make sure they are sorted by date */}
      {updates.map((update, index) => (
        <StatusEventTimelineReportUpdate
          key={update.id}
          report={update}
          duration={
            index === 0 && update.status === "operational"
              ? duration
              : undefined
          }
          withSeparator={index !== updates.length - 1}
        />
      ))}
    </div>
  );
}

function StatusEventTimelineReportUpdate({
  report,
  duration,
  withSeparator = true,
}: {
  report: StatusReport["updates"][number];
  withSeparator?: boolean;
  duration?: string;
}) {
  return (
    <div data-variant={report.status} className="group">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center h-5">
              <StatusEventTimelineDot />
            </div>
            {withSeparator ? <StatusEventTimelineSeparator /> : null}
          </div>
          <div className="mb-2">
            <StatusEventTimelineTitle>
              <span>{STATUS_LABELS[report.status]}</span>{" "}
              <span className="text-xs text-muted-foreground/70 font-mono underline underline-offset-2 decoration-dashed">
                <StatusEventDateHoverCard date={new Date(report.date)}>
                  {formatTime(report.date)}
                </StatusEventDateHoverCard>
              </span>{" "}
              {duration ? (
                <span className="text-xs text-muted-foreground/70 font-mono">
                  (in {duration})
                </span>
              ) : null}
            </StatusEventTimelineTitle>
            <StatusEventTimelineMessage>
              {report.message}
            </StatusEventTimelineMessage>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusEventTimelineMaintenance({
  maintenance,
}: {
  maintenance: Maintenance;
}) {
  const start = new Date(maintenance.startDate);
  const end = new Date(maintenance.endDate);
  const duration = formatDistanceStrict(start, end);
  return (
    <div data-variant="maintenance" className="group">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center h-5">
              <StatusEventTimelineDot />
            </div>
          </div>
          <div className="mb-2">
            <StatusEventTimelineTitle>
              <span>Maintenance</span>{" "}
              <span className="text-xs text-muted-foreground/70 font-mono">
                <span className="underline underline-offset-2 decoration-dashed">
                  <StatusEventDateHoverCard date={new Date(start)}>
                    {formatTime(start)}
                  </StatusEventDateHoverCard>
                </span>
                {" - "}
                <span className="underline underline-offset-2 decoration-dashed">
                  <StatusEventDateHoverCard date={new Date(end)}>
                    {formatTime(end)}
                  </StatusEventDateHoverCard>
                </span>
              </span>{" "}
              {duration ? (
                <span className="text-xs text-muted-foreground/70 font-mono">
                  (for {duration})
                </span>
              ) : null}
            </StatusEventTimelineTitle>
            <StatusEventTimelineMessage>
              {maintenance.message}
            </StatusEventTimelineMessage>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusEventTimelineTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// TODO: should support markdown
export function StatusEventTimelineMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function StatusEventTimelineDot({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "size-2.5 rounded-full bg-muted shrink-0",
        "group-data-[variant=operational]:bg-success",
        "group-data-[variant=monitoring]:bg-info",
        "group-data-[variant=identified]:bg-warning",
        "group-data-[variant=investigating]:bg-destructive",
        "group-data-[variant=maintenance]:bg-info",
        className
      )}
      {...props}
    />
  );
}

export function StatusEventTimelineSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      orientation="vertical"
      className={cn(
        "flex-1 mx-auto",
        "group-data-[variant=operational]:bg-success",
        "group-data-[variant=monitoring]:bg-info",
        "group-data-[variant=identified]:bg-warning",
        "group-data-[variant=investigating]:bg-destructive",
        "group-data-[variant=maintenance]:bg-info",
        className
      )}
      {...props}
    />
  );
}

export function StatusEventDateHoverCard({
  date,
  side = "right",
  align = "start",
  alignOffset = -4,
  sideOffset,
  children,
}: React.ComponentProps<typeof HoverCardContent> & { date: Date }) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      {/* NOTE: the trigger is an `a` tag per default */}
      <HoverCardTrigger asChild>
        <span>{children}</span>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          className="p-2 w-auto z-10"
          {...{ side, align, alignOffset, sideOffset }}
        >
          <dl className="flex flex-col gap-1">
            <Row value={format(date, "LLL dd, y HH:mm:ss")} label={timezone} />
            <Row
              value={format(new UTCDate(date), "LLL dd, y HH:mm:ss")}
              label="UTC"
            />
            {/* <Row value={date.toISOString()} label="ISO" /> */}
            {/* <Row value={String(date.getTime())} label="Timestamp" /> */}
            <Row
              value={formatDistanceToNowStrict(date, { addSuffix: true })}
              label="Relative"
            />
          </dl>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}

function Row({ value, label }: { value: string; label: string }) {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <div
      className="group flex gap-4 text-sm justify-between items-center"
      onClick={(e) => {
        e.stopPropagation();
        copy(value, {});
      }}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono truncate flex items-center gap-1">
        <span className="invisible group-hover:visible">
          {!isCopied ? (
            <Copy className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </span>
        {value}
      </dd>
    </div>
  );
}
