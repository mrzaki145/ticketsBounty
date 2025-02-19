import PageHeader from "@/components/layout/header";
import TicketsList from "@/features/tickets/components/tickets-list";
import TicketsListSkeleton from "@/features/tickets/components/tickets-list-skeleton";
import { type SearchParams } from "nuqs";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function TicketsPage({ searchParams }: PageProps) {
  return (
    <section className="flex-1 flex flex-col gap-y-12">
      <PageHeader title="All Tickets" description="Manage all tickets" />

      <div className="w-full max-w-lg mx-auto flex flex-col flex-1">
        <Suspense fallback={<TicketsListSkeleton />}>
          <TicketsList searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

export default TicketsPage;
