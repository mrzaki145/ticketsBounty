import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const queryParameter = parseAsString.withDefault("").withOptions({
  shallow: false,
  throttleMs: 500,
});

export const orderByParameter = parseAsStringEnum(["bounty", "createdAt"])
  .withDefault("createdAt")
  .withOptions({
    shallow: false,
    clearOnDefault: false,
  });

export const sortByParameter = parseAsStringEnum(["asc", "desc"])
  .withDefault("desc")
  .withOptions({
    shallow: false,
    clearOnDefault: false,
  });

export const pageParameter = parseAsInteger.withDefault(1).withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const loadSearchParams = createLoader({
  query: queryParameter,
  sortBy: sortByParameter,
  orderBy: orderByParameter,
  page: pageParameter,
});
