import CardCompact from "@/components/layout/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CommentSkeleton from "@/features/comments/components/comment-card-skeleton";
import TicketCardSkeleton from "@/features/tickets/components/ticket-card-skeleton";

function Loading() {
  return (
    <div className="space-y-8">
      <TicketCardSkeleton isDetailed />

      <Separator />

      <CardCompact
        title={<Skeleton className="h-8 w-40" />}
        description={<Skeleton className="h-4 w-60" />}
      >
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-14 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </CardCompact>

      <CommentSkeleton />
    </div>
  );
}

export default Loading;
