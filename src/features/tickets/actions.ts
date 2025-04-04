"use server";

import { prisma } from "@/lib/prisma";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/lib/utils";
import { signInPath, ticketPathId, ticketsPath } from "@/path";
import { Ticket } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth/auth";
import { isOwner } from "../auth/utils";
import { createTicketSchema, updateTicketSchema } from "./schema";

export async function createTicket(
  actionState: ActionState,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) redirect(signInPath());

  let ticket;
  try {
    const data = createTicketSchema.parse(Object.fromEntries(formData));

    ticket = await prisma.ticket.create({
      data: {
        title: data.title,
        content: data.content,
        bounty: Number(data.bounty), // Convert bounty to number since FormData values are strings
        deadline: new Date(data.deadline), // Convert deadline string to Date object
        userId,
      },
    });
    console.log("ticket", ticket);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());
  if (ticket) redirect(ticketPathId(ticket.id));

  return toActionState("SUCCESS", "Ticket created");
}

export async function updateTicket(
  id: number,
  actionState: ActionState,
  formData: FormData
) {
  let ticket;
  try {
    const data = updateTicketSchema.parse(Object.fromEntries(formData));

    ticket = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());
  // revalidateTag("tickets");
  if (ticket) redirect(ticketPathId(ticket.id));

  return toActionState("SUCCESS", "Ticket updated");
}

export async function deleteTicket(ticket: Ticket) {
  const isTicketOwner = await isOwner(ticket, (t) => t.userId);
  if (!isTicketOwner) return;

  await prisma.ticket.delete({
    where: {
      id: ticket.id,
    },
  });

  // try {
  // } catch (error) {
  //   return fromErrorToActionState(error);
  // }

  revalidatePath(ticketsPath());
  // revalidateTag("tickets");
  redirect(ticketsPath());

  // return toActionState("SUCCESS", "Ticket deleted");
}
