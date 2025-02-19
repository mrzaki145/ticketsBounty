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
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfileSchema } from "../schemas";

function AccountForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      // username: "",
    },
  });

  function submitCallback(values: z.infer<typeof updateProfileSchema>) {
    startTransition(async () => {
      await authClient.updateUser({
        name: values.name,
        // username: values.username,

        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success("Profile updated");
            router.refresh();
          },
          onError: (error) => {
            toast.error(error.response.statusText);
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Update Name" {...field} />
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

export default AccountForm;
