"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useActionFeedback from "@/hooks/use-action-feedback";
import { EMPTY_ACTION_STATE } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { createTicket } from "../actions";

export default function ProfileForm() {
  const [formState, formAction, pending] = useActionState(
    createTicket,
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
          defaultValue={formState.payload?.get("title") as string}
        />
        <ErrorMessage>{formState.fieldErrors?.title?.[0]}</ErrorMessage>
      </p>

      <p>
        <Label>Content</Label>
        <Textarea
          name="content"
          placeholder="Content"
          defaultValue={formState.payload?.get("content") as string}
        />
        <ErrorMessage>{formState.fieldErrors?.content?.[0]}</ErrorMessage>
      </p>

      <div className="grid lg:grid-cols-2 gap-4">
        <p>
          <Label>Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={formState.payload?.get("deadline") as string}
          />
          <ErrorMessage>{formState.fieldErrors?.deadline?.[0]}</ErrorMessage>
        </p>

        <p>
          <Label>Bounty $</Label>
          <Input
            type="text"
            name="bounty"
            placeholder="Bounty"
            defaultValue={formState.payload?.get("bounty") as string}
          />
          <ErrorMessage>{formState.fieldErrors?.bounty?.[0]}</ErrorMessage>
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        Create
        {pending && <LoaderCircleIcon className="animate-spin" />}
      </Button>
    </form>
  );
}
