"use client";

import { authClient } from "@/features/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  forgetPasswordSchema,
  forgetPasswordSchemaType,
} from "@/features/auth/schema";

export default function Page() {
  const form = useForm<forgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: forgetPasswordSchemaType) {
    try {
      const { data } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Forget Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
