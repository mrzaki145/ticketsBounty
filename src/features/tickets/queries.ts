import { prisma } from "@/lib/prisma";
import { loadSearchParams } from "@/lib/search-params";
import { type SearchParams } from "nuqs";

export const getTickets = async ({
  searchParams,
  userId,
}: {
  searchParams: Promise<SearchParams>;
  userId?: string;
}) => {
  const { query, sortBy, orderBy, page } = await loadSearchParams(searchParams);
  const take = 5;
  const skip = (page - 1) * take;

  const where = {
    AND: [
      query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                },
              },
            ],
          }
        : {},
      userId ? { userId } : {},
    ],
  };

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      orderBy: [
        orderBy == "bounty" ? { bounty: sortBy } : { createdAt: sortBy },
      ],
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },

      skip,
      take,
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};

export const getTicket = async (ticketId: string) => {
  return await prisma.ticket.findUnique({
    where: { id: Number.parseInt(ticketId) },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};
