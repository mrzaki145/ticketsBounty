import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "./auth";

export const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) return;

  return user;
});

export const isOwner = async <T>(
  entity: T,
  getUserId: (entity: T) => string
): Promise<boolean> => {
  const user = await getUser();

  if (!user) return false;

  return getUserId(entity) === user.id;
};
