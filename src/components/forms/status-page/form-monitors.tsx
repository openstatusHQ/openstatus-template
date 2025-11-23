"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  GripVertical,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "@/components/common/link";
import {
  EmptyStateContainer,
  EmptyStateTitle,
} from "@/components/content/empty-state";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardFooterInfo,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
} from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import type { Monitor } from "@/data/monitors";
import { monitors } from "@/data/monitors";
import { cn } from "@/lib/utils";

// TODO: add type selection + reordering

const IDS = monitors
  .slice(0, 3)
  .map((monitor) => ({ id: monitor.id, type: "monitor" }));

const GROUP_IDS = monitors
  .slice(4, 6)
  .map((monitor) => ({ id: monitor.id, type: "group" }));

const DISABLED_TYPES = ["none"];

const monitorSchema = z.object({
  id: z.number(),
  order: z.number(),
  type: z.enum(["all", "hide", "none"]),
});

const schema = z.object({
  monitors: z.array(monitorSchema),
  groups: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Group name is required"),
      monitors: z.array(monitorSchema),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

type MonitorGroup = {
  id: string;
  name: string;
  monitors: Monitor[];
};

export function FormMonitors({
  defaultValues,
  onSubmit,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => Promise<void> | void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      monitors: IDS.map((id, index) => ({
        id: id.id,
        order: index,
        type: "all",
      })),
      groups: [
        {
          id: "7",
          name: "Group 1",
          monitors: GROUP_IDS.map((id, index) => ({
            id: id.id,
            order: index,
            type: "all",
          })),
        },
      ],
    },
  });
  const _watchMonitors = form.watch("monitors");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<(Monitor | MonitorGroup)[]>([
    ...monitors.filter((monitor) =>
      IDS.some((id) => id.id === monitor.id && id.type === "monitor"),
    ),
    {
      id: "7",
      name: "Group 1",
      monitors: monitors.slice(4, 6),
    },
  ]);

  useEffect(() => {
    // setData(
    //   monitors.filter((monitor) =>
    //     watchMonitors.some((m) => m.id === monitor.id)
    //   )
    // );
  }, []);

  const onValueChange = useCallback(
    (newMonitors: (Monitor | MonitorGroup)[]) => {
      setData(newMonitors);
    },
    [],
  );

  const handleAddGroup = useCallback(() => {
    const newGroupId = String(Date.now());
    const existingGroups = form.getValues("groups") ?? [];
    const newGroups = [
      ...existingGroups,
      { id: newGroupId, name: "", monitors: [] },
    ];
    form.setValue("groups", newGroups);
    setData((prev) => [...prev, { id: newGroupId, name: "", monitors: [] }]);
  }, [form]);

  const handleDeleteGroup = useCallback(
    (groupId: string) => {
      const existingGroups = form.getValues("groups") ?? [];
      form.setValue(
        "groups",
        existingGroups.filter((g) => g.id !== groupId),
      );
      setData((prev) => prev.filter((item) => item.id !== groupId));
    },
    [form],
  );

  const getItemValue = useCallback(
    (item: Monitor | MonitorGroup) => item.id,
    [],
  );

  const renderOverlay = useCallback(
    ({ value }: { value: UniqueIdentifier }) => {
      console.log(value);
      const monitor = data.find((item) => item.id === value);
      if (!monitor) return null;

      if ("url" in monitor) {
        return (
          <MonitorRow
            monitor={monitor}
            form={form}
            className="border-transparent border-x px-2"
          />
        );
      }

      const groups = form.getValues("groups") ?? [];
      const groupIndex = groups.findIndex((g) => g.id === monitor.id);
      return (
        <MonitorGroup
          group={monitor}
          groupIndex={groupIndex}
          onDeleteGroup={handleDeleteGroup}
          form={form}
        />
      );
    },
    [data, handleDeleteGroup, form],
  );

  function submitAction(values: FormValues) {
    if (isPending) return;

    startTransition(async () => {
      try {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit?.(values);
        toast.promise(promise, {
          loading: "Saving...",
          success: () => JSON.stringify(values),
          error: "Failed to save",
        });
        await promise;
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)} {...props}>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Monitors</FormCardTitle>
            <FormCardDescription>
              Connect your monitors to your status page.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="monitors"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="sr-only">Monitors</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value.length > 0
                            ? `${field.value.length} monitors selected`
                            : "Select monitors"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search monitors..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No monitors found.</CommandEmpty>
                          <CommandGroup>
                            {monitors.map((monitor) => (
                              <CommandItem
                                value={monitor.name}
                                key={monitor.id}
                                onSelect={() => {
                                  if (
                                    field.value.some((m) => m.id === monitor.id)
                                  ) {
                                    form.setValue(
                                      "monitors",
                                      field.value.filter(
                                        (m) => m.id !== monitor.id,
                                      ),
                                    );
                                  } else {
                                    form.setValue("monitors", [
                                      ...field.value,
                                      { id: monitor.id, order: 0, type: "all" },
                                    ]);
                                  }
                                }}
                              >
                                {monitor.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value.some((m) => m.id === monitor.id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Choose monitors to display.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groups"
              render={() => (
                <FormItem>
                  <FormLabel className="sr-only">Add Group</FormLabel>
                  <FormControl>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleAddGroup}
                    >
                      <PlusIcon />
                      Add Group
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardSeparator />
          <FormCardContent>
            <Sortable
              value={data}
              onValueChange={onValueChange}
              getItemValue={getItemValue}
              orientation="vertical"
            >
              {data.length ? (
                <SortableContent className="grid gap-2">
                  {data.map((item) => {
                    console.log(item);
                    if ("url" in item) {
                      return (
                        <MonitorRow
                          key={`${item.id}-monitor`}
                          className="border-transparent border-x px-2"
                          monitor={item}
                          form={form}
                        />
                      );
                    }
                    console.log(item);
                    const groups = form.getValues("groups") ?? [];
                    const groupIndex = groups.findIndex(
                      (g) => g.id === item.id,
                    );
                    return (
                      <MonitorGroup
                        key={`${item.id}-group`}
                        group={item}
                        groupIndex={groupIndex}
                        onDeleteGroup={handleDeleteGroup}
                        form={form}
                      />
                    );
                  })}
                  <SortableOverlay>{renderOverlay}</SortableOverlay>
                </SortableContent>
              ) : (
                <EmptyStateContainer>
                  <EmptyStateTitle>No monitors selected</EmptyStateTitle>
                </EmptyStateContainer>
              )}
            </Sortable>
          </FormCardContent>
          <FormCardFooter>
            <FormCardFooterInfo>
              Learn more about monitor <Link href="#">display options</Link>.
            </FormCardFooterInfo>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  );
}

const types = {
  all: {
    label: "Show all uptime",
  },
  hide: {
    label: "Hide values",
  },
  none: {
    label: "Only status reports",
  },
};

interface MonitorRowProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SortableItem>, "value"> {
  monitor: Monitor;
  form: UseFormReturn<FormValues>;
}

function MonitorRow({ monitor, ...props }: MonitorRowProps) {
  return (
    <SortableItem value={monitor.id} asChild {...props}>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-row items-center gap-4 self-center">
          <SortableItemHandle>
            <GripVertical
              size={16}
              aria-hidden="true"
              className="text-muted-foreground"
            />
          </SortableItemHandle>
          <span className="truncate text-sm">{monitor.name}</span>
        </div>
        <div className="self-center truncate text-muted-foreground text-sm">
          {monitor.url}
        </div>
        <div>
          <Select>
            <SelectTrigger className="h-7 w-full shadow-none">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(types).map(([key, value]) => (
                <SelectItem
                  key={key}
                  value={key}
                  disabled={DISABLED_TYPES.includes(key)}
                >
                  {value.label}{" "}
                  {DISABLED_TYPES.includes(key) && (
                    <span className="text-foreground text-xs">(Upgrade)</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </SortableItem>
  );
}

interface MonitorGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SortableItem>, "value"> {
  group: MonitorGroup;
  groupIndex: number;
  onDeleteGroup: (groupId: string) => void;
  form: UseFormReturn<FormValues>;
}

function MonitorGroup({
  group,
  groupIndex,
  onDeleteGroup,
  form,
}: MonitorGroupProps) {
  const [data, setData] = useState<Monitor[]>(group.monitors);

  const onValueChange = useCallback((newMonitors: Monitor[]) => {
    setData(newMonitors);
  }, []);

  const getItemValue = useCallback((item: Monitor) => item.id, []);

  const renderOverlay = useCallback(
    ({ value }: { value: UniqueIdentifier }) => {
      const monitor = data.find((item) => item.id === value);
      if (!monitor) return null;

      return <MonitorRow monitor={monitor} form={form} />;
    },
    [data, form],
  );

  return (
    <SortableItem value={group.id} className="rounded-md border bg-muted">
      <div className="grid grid-cols-3 gap-2 px-2 pt-2">
        <div className="flex flex-row items-center gap-1 self-center">
          <SortableItemHandle>
            <GripVertical
              size={16}
              aria-hidden="true"
              className="text-muted-foreground"
            />
          </SortableItemHandle>
          <FormField
            control={form.control}
            name={`groups.${groupIndex}.name` as const}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Group name</FormLabel>
                <FormControl>
                  <Input placeholder="Group name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20 [&_svg]:size-4 [&_svg]:text-destructive"
            onClick={() => onDeleteGroup(group.id)}
          >
            <Trash2 />
            Delete Group
          </Button>
        </div>
        <div>
          <FormField
            control={form.control}
            name={`groups.${groupIndex}.monitors` as const}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="sr-only">Monitors</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {Array.isArray(field.value) && field.value.length > 0
                          ? `${field.value.length} monitors selected`
                          : "Select monitors"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search monitors..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No monitors found.</CommandEmpty>
                        <CommandGroup>
                          {monitors.map((monitor) => (
                            <CommandItem
                              value={monitor.name}
                              key={monitor.id}
                              onSelect={() => {
                                const current = (field.value ?? []) as Array<{
                                  id: number;
                                  order: number;
                                  type: "all" | "hide" | "none";
                                }>;
                                if (current.some((m) => m.id === monitor.id)) {
                                  form.setValue(
                                    `groups.${groupIndex}.monitors`,
                                    current.filter((m) => m.id !== monitor.id),
                                    { shouldValidate: true },
                                  );
                                } else {
                                  form.setValue(
                                    `groups.${groupIndex}.monitors`,
                                    [
                                      ...current,
                                      { id: monitor.id, order: 0, type: "all" },
                                    ],
                                    { shouldValidate: true },
                                  );
                                }
                              }}
                            >
                              {monitor.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  (field.value ?? []).some(
                                    (m) => m.id === monitor.id,
                                  )
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="mt-2 border-t px-2 pt-2 pb-2">
        <Sortable
          value={data}
          onValueChange={onValueChange}
          getItemValue={getItemValue}
          orientation="vertical"
        >
          {data.length ? (
            <SortableContent className="grid gap-2">
              {data.map((item) => {
                return (
                  <MonitorRow
                    key={`${item.id}-monitor`}
                    monitor={item}
                    form={form}
                  />
                );
              })}
              <SortableOverlay>{renderOverlay}</SortableOverlay>
            </SortableContent>
          ) : (
            <EmptyStateContainer>
              <EmptyStateTitle>No monitors selected</EmptyStateTitle>
            </EmptyStateContainer>
          )}
        </Sortable>
      </div>
    </SortableItem>
  );
}
