import type { Monitor } from "@/data/monitors";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";

export const searchParamsParsers = {
  status: parseAsArrayOf(
    parseAsStringLiteral([
      "Normal",
      "Degraded",
      "Failing",
      "Inactive",
    ] satisfies Monitor["status"][])
  ),
};
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
