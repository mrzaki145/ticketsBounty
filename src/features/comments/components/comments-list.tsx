import { Prisma } from "@prisma/client";
import CommentCard from "./comment-card";

type Props = {
  comments: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          image: true;
        };
      };
    };
  }>[];
};

async function CommentsList({ comments }: Props) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentsList;
