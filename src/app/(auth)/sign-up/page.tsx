"use client";

import CardCompact from "@/components/layout/card";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/path";
import Link from "next/link";

export default function Page() {
  return (
    <CardCompact
      title="Sign Up"
      description="Create a new account"
      className="w-full max-w-md"
      footer={
        <p className="w-full text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={signInPath()} className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </CardCompact>
  );
}
