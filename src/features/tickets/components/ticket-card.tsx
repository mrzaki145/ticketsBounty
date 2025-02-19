import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isOwner } from "@/features/auth/utils";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPathId } from "@/path";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  ExternalLinkIcon,
  FilePenIcon,
  FileTextIcon,
  PencilIcon,
} from "lucide-react";
import Link from "next/link";
import { cloneElement } from "react";
import TicketDelete from "./ticket-delete";

type Props = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          name: true;
        };
      };
    };
  }>;
  isDetailed?: boolean;
};

const TICKET_ICONS = {
  OPEN: <FilePenIcon />,
  IN_PROGRESS: <FileTextIcon />,
  CLOSED: <CheckCircleIcon />,
} as const;

async function TicketCard({ ticket, isDetailed = false }: Props) {
  const isTicketOwner = await isOwner(ticket, (t) => t.userId);

  return (
    <div className="w-full flex items-start gap-x-2">
      <Card className="flex-auto">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-start gap-x-2">
            <span className="text-xs text-muted-foreground mt-0.25">
              {cloneElement(TICKET_ICONS[ticket.status], {
                className: "size-5",
              })}
            </span>

            <p className="leading-normal">{ticket.title}</p>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-4">
          <CardDescription
            className={cn({
              "line-clamp-1": !isDetailed,
              "line-clamp-none": isDetailed,
            })}
          >
            {ticket.content}
          </CardDescription>
        </CardContent>

        <CardFooter className="pt-0 pb-6 px-6">
          <div className="w-full flex items-end justify-between ">
            <span className="text-sm text-muted-foreground">
              {ticket.deadline
                ? format(ticket.deadline, "yyyy-MM-dd")
                : "No deadline"}{" "}
              by {ticket.user.name}
            </span>
            <span className="text-lg text-primary font-semibold">
              ${ticket.bounty}
            </span>
          </div>
        </CardFooter>
      </Card>

      <div className="shrink-0 flex flex-col gap-y-2">
        <>
          {isDetailed ? (
            isTicketOwner && <TicketDelete ticket={ticket} />
          ) : (
            <Link
              prefetch
              href={ticketPathId(ticket.id)}
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <ExternalLinkIcon />
            </Link>
          )}

          {isTicketOwner && (
            <Link
              prefetch
              href={ticketEditPath(ticket.id)}
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <PencilIcon />
            </Link>
          )}
        </>
      </div>
    </div>
  );
}

export default TicketCard;
