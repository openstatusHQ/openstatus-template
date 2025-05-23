export function DataTableCellDate({ value }: { value: unknown }) {
  if (value instanceof Date) {
    return (
      <div className="text-muted-foreground">{value.toLocaleString()}</div>
    );
  }
  if (typeof value === "string") {
    return <div className="text-muted-foreground">{value}</div>;
  }
  return <div className="text-muted-foreground">-</div>;
}
