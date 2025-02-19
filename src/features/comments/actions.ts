"use server";

import { prisma } from "@/lib/prisma";
import { signInPath } from "@/path";
import { Comment, Ticket } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, isOwner } from "../auth/utils";

export async function createComment(ticket: Ticket, content: string) {
  const user = await getUser();

  if (!user) redirect(signInPath());

  const comment = await prisma.comment.create({
    data: {
      content,
      ticketId: ticket.id,
      userId: user.id,
    },
  });

  // revalidatePath(ticketPathId(ticket.id));
  revalidateTag("comments");

  return comment;
}

export async function deleteComment(comment: Comment) {
  const isCommentOwner = await isOwner(comment, (c) => c.userId);

  if (!isCommentOwner) return false;

  try {
    await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  revalidateTag("comments");
  return true;

  // revalidatePath(ticketPathId(comment.ticketId));
}

export async function voteOnComment(
  comment: Comment,
  voteType: "UPVOTE" | "DOWNVOTE"
) {
  const user = await getUser();
  if (!user) redirect(signInPath());

  try {
    const existingVote = await prisma.commentVote.findUnique({
      where: {
        commentId_userId: {
          commentId: comment.id,
          userId: user.id,
        },
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await prisma.commentVote.delete({
          where: {
            commentId_userId: {
              commentId: comment.id,
              userId: user.id,
            },
          },
        });
      } else {
        await prisma.commentVote.update({
          where: {
            commentId_userId: {
              commentId: comment.id,
              userId: user.id,
            },
          },
          data: {
            voteType: voteType,
          },
        });
      }
    } else {
      await prisma.commentVote.create({
        data: {
          comment: { connect: { id: comment.id } },
          user: { connect: { id: user.id } },
          voteType: voteType,
        },
      });
    }

    const voteCount = await prisma.commentVote.count({
      where: {
        commentId: comment.id,
        voteType: voteType, // Count based on the current voteType
      },
    });

    revalidateTag("comments");
    return voteCount;
  } catch (error) {
    console.error(`Error ${voteType.toLowerCase()}ing comment:`, error);
    throw error;
  }
}
