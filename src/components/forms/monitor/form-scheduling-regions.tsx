"use client";

import { Button } from "@/components/ui/button";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardSeparator,
  FormCardTitle,
} from "@/components/forms/form-card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { type Region, regions } from "@/data/regions";

const REGIONS = ["ams", "fra", "iad", "syd", "jnb", "gru"] satisfies Region[];
const PERIODICITY = ["30sec", "1m", "5m", "10m", "30m", "1h"] as const;

const GROUPED_REGIONS = regions.reduce((acc, region) => {
  const continent = region.continent;
  if (!acc[continent]) {
    acc[continent] = [];
  }
  acc[continent].push(region.code);
  return acc;
}, {} as Record<string, Region[]>);

const schema = z.object({
  regions: z.array(z.string()),
  periodicity: z.enum(PERIODICITY),
});

type FormValues = z.infer<typeof schema>;

export function FormSchedulingRegions({
  defaultValues,
}: {
  defaultValues?: FormValues;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      regions: REGIONS,
      periodicity: "10m",
    },
  });
  const [isPending, startTransition] = useTransition();

  function submitAction(values: FormValues) {
    if (isPending) return;

    startTransition(async () => {
      try {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));
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
      <form onSubmit={form.handleSubmit(submitAction)}>
        <FormCard>
          <FormCardHeader>
            <FormCardTitle>Scheduling & Regions</FormCardTitle>
            <FormCardDescription>
              Configure the scheduling and regions for your monitor.
            </FormCardDescription>
          </FormCardHeader>
          <FormCardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="periodicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periodicity</FormLabel>
                  <FormControl>
                    <div>
                      <Slider
                        value={[PERIODICITY.indexOf(field.value)]}
                        max={PERIODICITY.length - 1}
                        aria-label="Slider with ticks"
                        onValueChange={(value) => {
                          field.onChange(PERIODICITY[value[0]]);
                        }}
                      />
                      <span
                        className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                        aria-hidden="true"
                      >
                        {PERIODICITY.map((period) => (
                          <span
                            key={period}
                            className="flex w-0 flex-col items-center justify-center gap-2"
                          >
                            <span
                              className={cn("bg-muted-foreground/70 h-1 w-px")}
                            />
                            {period}
                          </span>
                        ))}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardSeparator />
          <FormCardContent>
            <FormField
              control={form.control}
              name="regions"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-4">
                      {Object.entries(GROUPED_REGIONS).map(([continent, r]) => {
                        return (
                          <div key={continent} className="space-y-2">
                            <FormLabel>{continent}</FormLabel>
                            <div className="grid grid-cols-2 gap-2">
                              {r.map((region) => {
                                const config = regions.find(
                                  (r) => r.code === region
                                );
                                return (
                                  <FormField
                                    key={region}
                                    control={form.control}
                                    name="regions"
                                    render={({ field }) => (
                                      <FormItem
                                        key={region}
                                        className="flex items-center"
                                      >
                                        <Checkbox
                                          id={region}
                                          checked={
                                            field.value?.includes(region) ||
                                            false
                                          }
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              field.onChange([
                                                ...field.value,
                                                region,
                                              ]);
                                            } else {
                                              field.onChange(
                                                field.value?.filter(
                                                  (r) => r !== region
                                                )
                                              );
                                            }
                                          }}
                                        />
                                        <FormLabel
                                          htmlFor={region}
                                          className="text-sm font-normal font-mono"
                                        >
                                          <span className="text-nowrap">
                                            {region} {config?.flag}
                                          </span>
                                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                            {config?.location}
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </FormCardContent>
          <FormCardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  );
}
