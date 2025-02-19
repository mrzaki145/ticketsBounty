import CardCompact from "@/components/layout/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <CardCompact
      title={<Skeleton className="h-8 w-40" />}
      description={<Skeleton className="h-4 w-60" />}
    >
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-24 mb-3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-24 mb-3" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-24 mb-3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </CardCompact>
  );
}
