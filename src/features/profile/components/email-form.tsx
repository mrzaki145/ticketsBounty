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
import { updateEmailSchema } from "../schemas";

function EmailForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  function submitCallback(values: z.infer<typeof updateEmailSchema>) {
    startTransition(async () => {
      await authClient.changeEmail({
        newEmail: values.newEmail,

        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success("Email updated");
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
          name="newEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Update Email" {...field} />
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

export default EmailForm;
