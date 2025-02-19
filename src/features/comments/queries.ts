import { prisma } from "@/lib/prisma";
import { getUser } from "../auth/utils";

export async function getComments(ticketId: string) {
  return await prisma.comment.findMany({
    where: { ticketId: Number.parseInt(ticketId) },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}

// Checking User's Vote: You can check if a user has already voted on a ticket or comment:
export async function hasUserVoted(ticketId: number) {
  const user = await getUser();

  const userVote = await prisma.commentVote.findFirst({
    where: {
      userId: user?.id,
      comment: {
        ticketId,
      },
    },
  });

  return userVote;
}

export async function getTicketVoteCounts(ticketId: number) {
  const [upvoteCount, downvoteCount] = await prisma.$transaction([
    prisma.commentVote.count({
      where: {
        comment: { ticketId: ticketId },
        voteType: "UPVOTE",
      },
    }),
    prisma.commentVote.count({
      where: {
        comment: { ticketId: ticketId },
        voteType: "DOWNVOTE",
      },
    }),
  ]);

  const totalVotes = upvoteCount + downvoteCount;

  return {
    upvoteCount,
    downvoteCount,
    totalVotes,
  };
}
