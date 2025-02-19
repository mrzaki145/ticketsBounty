"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  orderByParameter,
  pageParameter,
  queryParameter,
  sortByParameter,
} from "@/lib/search-params";
import { type Prisma } from "@prisma/client";
import { MoreVerticalIcon } from "lucide-react";
import { useQueryState } from "nuqs";

function TicketSearchInput() {
  const [query, setQuery] = useQueryState("query", queryParameter);
  const [sortBy, setSortBy] = useQueryState("sortBy", sortByParameter);
  const [orderBy, setOrderBy] = useQueryState("orderBy", orderByParameter);
  const [, setPage] = useQueryState("page", pageParameter);

  return (
    <div className="bg-background pt-6 pb-6 -mt-6 sticky top-15 flex gap-x-3">
      <Input
        type="text"
        value={query || ""}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(1);
        }}
        placeholder="Search tickets"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={sortBy || ""}
            onValueChange={(value) => setSortBy(value as Prisma.SortOrder)}
          >
            <DropdownMenuRadioItem value="desc">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="asc">Oldest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={orderBy || ""}
            onValueChange={(value) =>
              setOrderBy(value as "bounty" | "createdAt")
            }
          >
            <DropdownMenuRadioItem value="createdAt">
              Order by created at
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bounty">
              Order by bounty
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TicketSearchInput;
