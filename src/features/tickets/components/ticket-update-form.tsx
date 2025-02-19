"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useActionFeedback from "@/hooks/use-action-feedback";
import { EMPTY_ACTION_STATE } from "@/lib/utils";
import { Ticket } from "@prisma/client";
import { LoaderCircleIcon } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateTicket } from "../actions";

type Props = {
  ticket: Ticket;
};

export default function TicketUpdateForm({ ticket }: Props) {
  const [formState, formAction, pending] = useActionState(
    updateTicket.bind(undefined, ticket.id),
    EMPTY_ACTION_STATE
  );

  useActionFeedback(formState, {
    onSuccess: () => {
      toast.success(formState.message);
    },
    onError: () => {
      toast.error(formState.message);
    },
  });

  return (
    <form action={formAction} className="space-y-6">
      <p>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={
            (formState.payload?.get("title") as string) ?? ticket.title
          }
        />
        <ErrorMessage>{formState.fieldErrors?.title?.[0]}</ErrorMessage>
      </p>

      <p>
        <Label>Content</Label>
        <Textarea
          name="content"
          placeholder="Content"
          defaultValue={
            (formState.payload?.get("content") as string) ?? ticket.content
          }
        />
        <ErrorMessage>{formState.fieldErrors?.content?.[0]}</ErrorMessage>
      </p>

      <p>
        <Label>Status</Label>
        <Select
          name="status"
          defaultValue={
            (formState.payload?.get("status") as string) ?? ticket.status
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="CLOSED">Done</SelectItem>
          </SelectContent>
        </Select>
      </p>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        Update
        {pending && <LoaderCircleIcon className="animate-spin" />}
      </Button>
    </form>
  );
}
