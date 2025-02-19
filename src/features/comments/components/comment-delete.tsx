"use client";

import { Button } from "@/components/ui/button";
import { Comment } from "@prisma/client";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteComment } from "../actions";

function CommentDelete({ comment }: { comment: Comment }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteComment(comment);
      // console.log(result);

      if (!result) {
        toast.error("Failed to delete comment");
        return;
      }
      toast.success("Comment deleted successfully");
    });
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleDelete}
      disabled={pending}
    >
      {pending ? (
        <LoaderCircleIcon className="size-4 animate-spin" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
}

export default CommentDelete;
