"use client";

import CardCompact from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createComment } from "../actions";
import { newCommentSchema } from "../schemas";

type Props = {
  ticket: Prisma.TicketGetPayload<{
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

function CommentForm({ ticket }: Props) {
  const [pending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const submitCallback = async (data: z.infer<typeof newCommentSchema>) => {
    startTransition(async () => {
      await createComment(ticket, data.content);
    });
    form.reset();
  };

  return (
    <CardCompact
      title="Add a comment"
      description="Add a comment to this ticket"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(submitCallback)}
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>C</FormLabel> */}
                <FormControl>
                  <Textarea {...field} placeholder="Write your comment here" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={pending}>
            Submit
          </Button>
        </form>
      </Form>
    </CardCompact>
  );
}

export default CommentForm;
