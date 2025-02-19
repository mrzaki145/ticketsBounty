import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isOwner } from "@/features/auth/utils";
import { Prisma } from "@prisma/client";
import CommentDelete from "./comment-delete";

type Props = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          image: true;
        };
      };
    };
  }>;
};

async function CommentCard({ comment }: Props) {
  const isCommentOwner = await isOwner(comment, (c) => c.userId); // t is inferred as type of ticket

  return (
    <div className="w-full flex items-start gap-x-2">
      <Card className="flex-auto">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-x-2">
            <Avatar className="size-9">
              <AvatarImage src={comment.user.image ?? undefined} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-normal mb-0.5">
                {comment.user.name}
              </p>
              <span className="text-xs text-muted-foreground">
                {comment.createdAt.toDateString()}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>{comment.content}</CardDescription>

          {/* <CommentVotes comment={comment} /> */}
        </CardContent>
      </Card>

      <div className="shrink-0 flex flex-col gap-y-2">
        {isCommentOwner && <CommentDelete comment={comment} />}
      </div>
    </div>
  );
}
export default CommentCard;
