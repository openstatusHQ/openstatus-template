import { regions } from "@/data/regions";
import { getToolsPage } from "@/content/utils";
import { cn } from "@/lib/utils";

const STATUS_CODES = {
  "1": "text-muted-foreground",
  "2": "text-success",
  "3": "text-info",
  "4": "text-warning",
  "5": "text-destructive",
};

const r = regions.map((region) => {
  const latency = Math.random() * 1000;
  const status = Math.random() < 0.9 ? 200 : 500;
  return { region: region.code, latency, status };
});

// just random to have one
export async function generateStaticParams() {
  return [{ slug: "1" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getToolsPage("checker");
  console.log({ slug });
  return (
    <section className="prose">
      <h1>{page.metadata.title}</h1>
      <p className="text-lg">{page.metadata.summary}</p>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Status</th>
            <th>DNS</th>
            <th>Connect</th>
            <th>TLS</th>
            <th>TTFB</th>
            <th className="text-right!">Latency</th>
          </tr>
        </thead>
        <tbody>
          {r.map(({ region, latency, status }) => {
            const regionConfig = regions.find((r) => r.code === region);
            return (
              <tr key={region}>
                <td>
                  {regionConfig?.flag} {regionConfig?.code}{" "}
                  <span className="text-muted-foreground">
                    {regionConfig?.location}
                  </span>
                </td>
                <td
                  className={cn(
                    STATUS_CODES[
                      status.toString()[0] as keyof typeof STATUS_CODES
                    ]
                  )}
                >
                  {status}
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td>
                  <br />
                </td>
                <td className="text-right!">
                  {Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 0,
                  }).format(latency)}
                  ms
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
