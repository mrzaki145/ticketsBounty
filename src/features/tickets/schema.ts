import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "content is required").max(1024),
  // deadline: z.date().optional(),
  deadline: z.string().min(1, "Deadline is required"),
  bounty: z.coerce
    .number({
      invalid_type_error: "Bounty is required",
    })
    .min(1, "Bounty is required"),
});
export type CreateTicketSchema = z.infer<typeof createTicketSchema>;

export const updateTicketSchema = z.object({
  // id: z.number().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Description is required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;
