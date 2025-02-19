import CardCompact from "@/components/layout/card";
import PageHeader from "@/components/layout/header";
import { getUser } from "@/features/auth/utils";
import TicketCreateForm from "@/features/tickets/components/ticket-create-form";
import TicketsList from "@/features/tickets/components/tickets-list";
import TicketsListSkeleton from "@/features/tickets/components/tickets-list-skeleton";
import { type SearchParams } from "nuqs";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function TicketsPage({ searchParams }: Props) {
  const user = await getUser();

  return (
    <section className="flex-1 flex flex-col gap-y-12">
      <PageHeader title="My Tickets" description="Manage your tickets" />

      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col gap-6 lg:flex-row">
        <div className="flex-[45%] sticky top-21 self-start">
          <CardCompact title="Create Ticket" description="Create a new ticket">
            <TicketCreateForm />
          </CardCompact>
        </div>

        <div className="flex-[55%] flex flex-col">
          <Suspense fallback={<TicketsListSkeleton />}>
            <TicketsList userId={user?.id} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default TicketsPage;
