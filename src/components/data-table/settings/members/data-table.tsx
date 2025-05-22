import { QuickActions } from "@/components/dropdowns/quick-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
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
          <TableCell>Maximilian Kaske</TableCell>
          <TableCell>max@openstatus.dev</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>2021-01-01</TableCell>
          <TableCell>
            <div className="flex justify-end">
              <QuickActions
                deleteAction={{
                  title: "User",
                  confirmationValue: "delete",
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
