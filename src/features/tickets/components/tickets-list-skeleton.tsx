import { Skeleton } from "@/components/ui/skeleton";
import TicketCardSkeleton from "./ticket-card-skeleton";

function TicketsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-x-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="size-9" />
      </div>

      <div className="grid gap-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ opacity: 1 - index / 3 }}>
            <TicketCardSkeleton key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketsListSkeleton;
