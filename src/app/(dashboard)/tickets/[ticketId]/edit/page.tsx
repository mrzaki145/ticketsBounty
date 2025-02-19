import CardCompact from "@/components/layout/card";
import Placeholder from "@/components/layout/placeholder";
import { isOwner } from "@/features/auth/utils";
import TicketUpdateForm from "@/features/tickets/components/ticket-update-form";
import { getTicket } from "@/features/tickets/queries";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ ticketId: string }>;
};

async function EditPage({ params }: PageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  const isTicketOwner = await isOwner(ticket, (t) => t.userId);

  if (!isTicketOwner)
    return (
      <Placeholder
        title="Unauthorized"
        description="You are not authorized to edit this ticket"
      />
    );

  return (
    <CardCompact title="Edit ticket" description="Edit a ticket">
      <TicketUpdateForm ticket={ticket} />
    </CardCompact>
  );
}

export default EditPage;
