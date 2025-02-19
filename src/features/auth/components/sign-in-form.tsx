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
import { homePath } from "@/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signinSchema, SigninSchemaType } from "../schema";

function SignInForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully");
            router.push(homePath());
            router.refresh();
          },

          onResponse: (context) => {
            if (context.response.status == 401) {
              toast.error("Invalid credentials");
              form.setError("email", {
                message: "",
              });
              form.setError("password", {
                message: "",
              });
            }
          },
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
