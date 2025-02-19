import { Separator } from "@/components/ui/separator";
import { getUser } from "@/features/auth/utils";
import CommentForm from "@/features/comments/components/comment-form";
import CommentsList from "@/features/comments/components/comments-list";
import { getComments } from "@/features/comments/queries";
import TicketCard from "@/features/tickets/components/ticket-card";
import { getTicket } from "@/features/tickets/queries";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ ticketId: string }>;
};

async function TicketPage({ params }: PageProps) {
  const user = await getUser();

  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  const comments = await getComments(ticketId);

  if (!ticket) notFound();

  return (
    <section className="space-y-8">
      <TicketCard ticket={ticket} isDetailed />

      <Separator />

      {user ? (
        <CommentForm ticket={ticket} />
      ) : (
        <p className="text-center">You need to be logged in to comment.</p>
      )}

      <CommentsList comments={comments} />
    </section>
  );
}

export default TicketPage;
