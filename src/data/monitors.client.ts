import { Pencil, Copy, Forward, CopyPlus, File, Trash2 } from "lucide-react";

export const actions = [
  {
    id: "edit",
    label: "Edit",
    icon: Pencil,
    variant: "default" as const,
  },
  {
    id: "share",
    label: "Share",
    icon: Forward,
    variant: "default" as const,
  },
  {
    id: "copy-id",
    label: "Copy ID",
    icon: Copy,
    variant: "default" as const,
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: CopyPlus,
    variant: "default" as const,
  },
  {
    id: "export",
    label: "Export",
    icon: File,
    variant: "default" as const,
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    variant: "destructive" as const,
  },
] as const;

export type MonitorAction = (typeof actions)[number];

export const getActions = (
  props: Partial<Record<MonitorAction["id"], () => Promise<void> | void>>
): (MonitorAction & { onClick?: () => Promise<void> | void })[] => {
  return actions.map((action) => ({
    ...action,
    onClick: props[action.id as keyof typeof props],
  }));
};
