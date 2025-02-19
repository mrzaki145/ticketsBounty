"use client";

import CardCompact from "@/components/layout/card";
import SignInForm from "@/features/auth/components/sign-in-form";
import { signUpPath } from "@/path";
import Link from "next/link";

export default function Page() {
  return (
    <CardCompact
      title="Login"
      description="Enter your email below to login to your account"
      footer={
        <p className="w-full text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={signUpPath()} className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      }
    >
      <SignInForm />
    </CardCompact>
  );
}
