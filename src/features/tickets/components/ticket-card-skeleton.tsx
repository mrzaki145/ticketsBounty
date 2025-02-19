import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isDetailed?: boolean;
};

function TicketCardSkeleton({ isDetailed = false }: Props) {
  return (
    <div className="w-full flex items-start gap-x-2">
      <Card className="flex-auto">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-x-2">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-[200px]" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-5 w-full" />
          {isDetailed && (
            <>
              <Skeleton className="h-5 w-[95%] mt-2" />
              <Skeleton className="h-5 w-[90%] mt-2" />
              <Skeleton className="h-5 w-[85%] mt-2" />
              <Skeleton className="h-5 w-[60%] mt-2" />
            </>
          )}
        </CardContent>
      </Card>

      <div className="shrink-0">
        <Skeleton className="size-8.5 rounded-full" />
        <Skeleton className="size-8.5 rounded-full mt-2" />
      </div>
    </div>
  );
}

export default TicketCardSkeleton;
