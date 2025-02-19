"use client";

import { authClient } from "@/features/auth/auth-client";
import {
  resetPasswordSchema,
  type resetPasswordSchemaType,
} from "@/features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: resetPasswordSchemaType) {
    console.log(values);

    const { error } = await authClient.resetPassword({
      token: token!,
      newPassword: values.password,
    });

    if (error) {
      console.log(error);
    } else {
      router.push("/login");
      // router.refresh();
    }
  }

  if (error == "invalid_token") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Invalid Token</h1>
        <p className="text-gray-600 mb-4">
          The token you provided is invalid or has expired. Please try again.
        </p>
        <Button onClick={() => router.push("/reset-password")}>
          Reset Password
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password to reset your account password.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}

export default Page;
