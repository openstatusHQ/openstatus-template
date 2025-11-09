import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { cn } from "@/lib/utils";

function Table({
  data,
}: {
  data: { headers: React.ReactNode[]; rows: React.ReactNode[][] };
}) {
  const headers = data.headers.map((header: React.ReactNode, index: number) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row: React.ReactNode[], index: number) => (
    <tr key={index}>
      {row.map((cell: React.ReactNode, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Grid({
  cols = 2,
  children,
  className,
}: {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}) {
  const colsClass = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  // Remove top border from all except first row
  const topBorderClass = {
    1: "[&>*]:border-t-0 [&>*:first-child]:border-t",
    2: "[&>*]:border-t-0 [&>*:first-child]:border-t md:[&>*:nth-child(-n+2)]:border-t",
    3: "[&>*]:border-t-0 [&>*:first-child]:border-t md:[&>*:nth-child(-n+3)]:border-t",
    4: "[&>*]:border-t-0 [&>*:first-child]:border-t md:[&>*:nth-child(-n+4)]:border-t",
  };

  // Remove left border from all except first column
  const leftBorderClass = {
    1: "[&>*]:border-l-0 [&>*:first-child]:border-l",
    2: "[&>*]:border-l-0 [&>*:first-child]:border-l md:[&>*:nth-child(2n+1)]:border-l",
    3: "[&>*]:border-l-0 [&>*:first-child]:border-l md:[&>*:nth-child(3n+1)]:border-l",
    4: "[&>*]:border-l-0 [&>*:first-child]:border-l md:[&>*:nth-child(4n+1)]:border-l",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 my-6",
        "[&>*]:p-4 [&>*]:border [&>*]:border-border",
        // NOTE: remove extra margin from prose grid cells of first and last element
        "[&>*>*:first-child]:!mt-0 [&>*>*:last-child]:!mb-0",
        colsClass[cols],
        topBorderClass[cols],
        leftBorderClass[cols],
        className
      )}
    >
      {children}
    </div>
  );
}

function CustomLink(props: React.ComponentProps<"a">) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

function Code({ children, ...props }: { children: React.ReactNode }) {
  const codeHTML = highlight(children?.toString() ?? "");
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children?.toString() ?? "");
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Grid,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
