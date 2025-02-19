"use client";

import { homePath } from "@/path";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "../auth-client";

export default function SignOutButton() {
  const router = useRouter();

  function handleSignout() {
    authClient.signOut();

    setTimeout(() => {
      router.refresh();
    }, 100);
    redirect(homePath());
  }

  return (
    <button
      className="w-full cursor-pointer text-start"
      onClick={handleSignout}
    >
      Sign out
    </button>
  );
}
