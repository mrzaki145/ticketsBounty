import Placeholder from "@/components/layout/placeholder";
import { type SearchParams } from "nuqs";
import { getTickets } from "../queries";
import TicketCard from "./ticket-card";
import TicketSearchInput from "./ticket-filter";
import TicketsPagination from "./tickets-pagenation";

type Props = {
  searchParams: Promise<SearchParams>;
  userId?: string;
};

async function TicketsList({ searchParams, userId }: Props) {
  const PAGE_LIMIT = 5;
  const { list: tickets, metadata } = await getTickets({
    searchParams,
    userId,
  });

  return (
    <>
      <TicketSearchInput />

      {tickets.length > 0 ? (
        <ul className="grid gap-6">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <TicketCard ticket={ticket} />
            </li>
          ))}
        </ul>
      ) : (
        <Placeholder title="No tickets found" />
      )}

      {tickets.length > PAGE_LIMIT || <TicketsPagination metadata={metadata} />}
    </>
  );
}

export default TicketsList;
