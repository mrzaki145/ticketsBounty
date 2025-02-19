import { z } from "zod";

export const newCommentSchema = z.object({
  content: z.string().min(1).max(255),
});
