function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl w-full flex flex-col flex-auto">
      {children}
    </div>
  );
}

export default Layout;
