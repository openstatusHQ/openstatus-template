import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>thibault@openstatus.dev</TableCell>
          <TableCell>Member</TableCell>
          <TableCell>2021-01-01</TableCell>
          <TableCell>
            <div className="flex justify-end">
              <Button
                size="icon"
                variant="ghost"
                className="size-5"
                aria-label="Edit member"
              >
                <Ellipsis size={16} aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
