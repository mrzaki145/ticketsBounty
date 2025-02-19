function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}

export default Layout;
