import Navbar from "@/components/layout/nav-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {/* <AppSidebar /> */}

      <main className="flex flex-1 flex-col px-4 py-10">{children}</main>
      {/* <SidebarProvider>
      </SidebarProvider> */}
    </>
  );
}
