export const statusCodes = [
  {
    code: 200 as const,
    bg: "bg-green-500",
    text: "text-green-500",
    name: "OK",
  },
  {
    code: 500 as const,
    bg: "bg-destructive",
    text: "text-destructive",
    name: "Internal Server Error",
  },
];

export type StatusCode = (typeof statusCodes)[number]["code"];
