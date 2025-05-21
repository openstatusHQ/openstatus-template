"use client";

import { Button } from "@/components/ui/button";
import {
  FormCard,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
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

const REGIONS = ["ams", "fra", "lon", "nyc", "sfo", "sgp", "tor"];
const PERIODICITY = ["30sec", "1m", "5m", "10m", "30m", "1h"] as const;

const schema = z.object({
  regions: z.array(z.string()),
  periodicity: z.enum(PERIODICITY),
});

type FormValues = z.infer<typeof schema>;

export function FormSchedulingRegions() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
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
            <FormField
              control={form.control}
              name="regions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regions</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2">
                      {REGIONS.map((region) => (
                        <div
                          key={region}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={region}
                            checked={field.value?.includes(region) || false}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, region]);
                              } else {
                                field.onChange(
                                  field.value?.filter((r) => r !== region)
                                );
                              }
                            }}
                          />
                          <label htmlFor={region} className="text-sm">
                            {region}
                          </label>
                        </div>
                      ))}
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
