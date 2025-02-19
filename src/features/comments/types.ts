export type CommentWithVotes = Comment & {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
};
