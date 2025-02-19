"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";
import { CommentWithVotes } from "../types";

type Props = {
  comment: CommentWithVotes;
};

function CommentVotes({ comment }: Props) {
  // async function upvoteComment() {
  //   return voteOnComment(comment.id, "UPVOTE");
  // }

  // async function downvoteComment() {
  //   return voteOnComment(comment.id, "DOWNVOTE");
  // }

  return (
    <div className="flex items-center justify-end mt-2">
      <Button
        size="sm"
        variant="link"
        // onClick={upvoteComment}
      >
        <ArrowBigUpIcon />
        <span className="text-xs">Like {comment.upvotes}</span>
      </Button>
      <Button
        size="sm"
        variant="link"
        // onClick={downvoteComment}
      >
        <ArrowBigDownIcon />
        <span className="text-xs">Dislike {comment.downvotes}</span>
      </Button>
    </div>
  );
}
export default CommentVotes;
