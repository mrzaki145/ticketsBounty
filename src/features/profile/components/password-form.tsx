import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/features/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updatePasswordSchema } from "../schemas";

function PasswordForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
    },
  });

  function submitCallback(values: z.infer<typeof updatePasswordSchema>) {
    startTransition(async () => {
      await authClient.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,

        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success("Password updated");
          },
          onError: ({ error }) => {
            toast.error(error.message);
          },
        },
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitCallback)}
        className="flex flex-col gap-y-6"
      >
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="currentPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          Save
        </Button>
      </form>
    </Form>
  );
}

export default PasswordForm;
