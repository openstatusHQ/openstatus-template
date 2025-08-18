import { StatusReport, statusReports } from "@/data/status-reports";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { formatDistanceStrict } from "date-fns";

const STATUS_LABELS = {
  operational: "Resolved",
  monitoring: "Monitoring",
  identified: "Identified",
  investigating: "Investigating",
};

export function StatusEvents() {
  return (
    <div className="flex flex-col gap-4">
      {statusReports.map((report) => (
        <StatusEvent key={report.id}>
          <StatusEventDate>
            {formatDate(report.startedAt, { month: "short" })}
          </StatusEventDate>
          <StatusEventContent>
            <StatusEventTitle>{report.name}</StatusEventTitle>
            <StatusEventAffected className="flex flex-wrap gap-1">
              {report.affected.map((affected) => (
                <Badge key={affected} variant="outline" className="text-[10px]">
                  {affected}
                </Badge>
              ))}
            </StatusEventAffected>
            <StatusEventTimeline updates={report.updates} />
          </StatusEventContent>
        </StatusEvent>
      ))}
    </div>
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
  children,
  ...props
}: React.ComponentProps<"div">) {
  // TODO: add Link
  return (
    <div
      className={cn(
        "group flex flex-col gap-2 hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-lg px-3 -mx-3 py-2 -my-2",
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

export function StatusEventDate({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="lg:absolute lg:-left-32 lg:top-0 lg:h-full">
      <div
        className={cn(
          "font-medium text-foreground/80 lg:sticky lg:top-0 lg:left-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function StatusEventTimeline({
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
        <div key={update.id} data-variant={update.status} className="group">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center h-5">
                  <StatusEventTimelineDot />
                </div>
                {index !== updates.length - 1 ? (
                  <Separator
                    orientation="vertical"
                    className={cn(
                      "flex-1 mx-auto",
                      "group-data-[variant=operational]:bg-success",
                      "group-data-[variant=monitoring]:bg-info",
                      "group-data-[variant=identified]:bg-warning",
                      "group-data-[variant=investigating]:bg-destructive"
                    )}
                  />
                ) : null}
              </div>
              <div className="mb-2">
                <StatusEventTimelineTitle>
                  {STATUS_LABELS[update.status]}{" "}
                  <span className="text-xs text-muted-foreground/70 font-mono">
                    {update.date.toLocaleTimeString()}
                  </span>{" "}
                  {index === 0 && update.status === "operational" ? (
                    <span className="text-xs text-muted-foreground/70 font-mono">
                      (in {duration})
                    </span>
                  ) : null}
                </StatusEventTimelineTitle>
                <StatusEventTimelineMessage>
                  {update.message}
                </StatusEventTimelineMessage>
              </div>
            </div>
          </div>
        </div>
      ))}
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
        className
      )}
      {...props}
    />
  );
}
