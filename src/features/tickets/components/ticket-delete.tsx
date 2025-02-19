"use client";

import { Button } from "@/components/ui/button";
import { Ticket } from "@prisma/client";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteTicket } from "../actions";

type Props = {
  ticket: Ticket;
};

function TicketDelete({ ticket }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteTicket(ticket);
      toast.success("Ticket deleted successfully");
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

export default TicketDelete;
