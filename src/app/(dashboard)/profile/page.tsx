"use client";

import CardCompact from "@/components/layout/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountForm from "@/features/profile/components/account-form";
import EmailForm from "@/features/profile/components/email-form";
import PasswordForm from "@/features/profile/components/password-form";
import { TabsContent } from "@radix-ui/react-tabs";

function Page() {
  return (
    <section className="flex-1 flex flex-col gap-y-12">
      {/* <PageHeader  /> */}

      <div className="w-full max-w-lg mx-auto">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <CardCompact title="Profile" description="Manage your profile">
              <AccountForm />
            </CardCompact>
          </TabsContent>

          <TabsContent value="email">
            <CardCompact title="Email" description="Update your email">
              <EmailForm />
            </CardCompact>
          </TabsContent>

          <TabsContent value="password">
            <CardCompact title="Password" description="Update your password">
              <PasswordForm />
            </CardCompact>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
