import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CommentSkeleton() {
  return (
    <Card className="flex-auto animate-pulse">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-x-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[250px]" />
      </CardContent>
    </Card>
  );
}

export default CommentSkeleton;
