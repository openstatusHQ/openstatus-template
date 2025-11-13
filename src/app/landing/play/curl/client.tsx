"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { regions } from "@/data/regions";
import { createContext, useContext, useState } from "react";

type Values = { region: string; latency: number; status: number };

type CurlBuilderContextType = {
  values: Values[];
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
};

const CurlBuilderContext = createContext<CurlBuilderContextType>({
  values: [],
  setValues: () => {},
});

export function CurlBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [values, setValues] = useState<Values[]>([]);
  return (
    <CurlBuilderContext.Provider value={{ values, setValues }}>
      {children}
    </CurlBuilderContext.Provider>
  );
}

export function useCurlBuilderContext() {
  const context = useContext(CurlBuilderContext);
  if (!context) {
    throw new Error(
      "useCurlBuilderContext must be used within a CurlBuilderProvider"
    );
  }
  return context;
}

export function Form() {
  const { setValues } = useCurlBuilderContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get("url") as string;
    const method = formData.get("method") as string;

    console.log(url, method);

    setValues([]);

    const r = regions.map((region) => {
      const latency = Math.random() * 1000;
      const status = Math.random() < 0.9 ? 200 : 500;
      return { region: region.code, latency, status };
    });

    r.forEach((value) => {
      setTimeout(() => {
        setValues((prev) => [...prev, value]);
      }, value.latency);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1 space-y-1">
          <Label htmlFor="method" className="text-base">
            Method
          </Label>
          <Select name="method" defaultValue="GET">
            <SelectTrigger
              id="method"
              className="w-full h-auto! p-4 rounded-none text-base"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
                <SelectItem
                  key={method}
                  value={method}
                  className="rounded-none px-2 py-3"
                >
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-4 space-y-1">
          <Label htmlFor="url" className="text-base">
            URL
          </Label>
          <Input
            name="url"
            id="url"
            placeholder="https://openstatus.dev"
            className="p-4 h-auto! rounded-none text-base md:text-base"
          />
        </div>
        <div className="col-span-5 space-y-1">
          <Label htmlFor="headers" className="text-base">
            Headers
          </Label>
        </div>
        <div className="col-span-5 space-y-1">
          <Label htmlFor="body" className="text-base">
            Body
          </Label>
          <Textarea
            id="body"
            name="body"
            placeholder=""
            className="p-4 h-auto! rounded-none text-base md:text-base"
          />
        </div>
        <div className="col-span-5 space-y-1">
          <div className="flex items-start space-x-2">
            <Checkbox id="json-body" className="rounded-none size-5" />
            <Label
              htmlFor="json-body"
              className="text-base flex flex-col items-start gap-0"
            >
              <span>JSON Content-Type</span>
              <span className="text-muted-foreground">
                Set the Content-Type header to application/json.
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="verbose" className="rounded-none size-5" />
            <Label
              htmlFor="verbose"
              className="text-base flex flex-col items-start gap-0"
            >
              <span>Verbose</span>
              <span className="text-muted-foreground">
                Make the operation more talkative.
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="insecure" className="rounded-none size-5" />
            <Label
              htmlFor="insecure"
              className="text-base flex flex-col items-start gap-0"
            >
              <span>Accept self-signed certificats</span>
              <span className="text-muted-foreground">
                Allow insecure server connections.
              </span>
            </Label>
          </div>
        </div>
        <div className="col-span-5">
          <Button
            type="submit"
            variant="outline"
            className="w-full h-full p-4 rounded-none text-base"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
