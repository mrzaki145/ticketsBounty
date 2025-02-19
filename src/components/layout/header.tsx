import { Separator } from "../ui/separator";

type PageHeaderProps = {
  title: string;
  description?: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="w-full mx-auto max-w-4xl flex flex-col gap-y-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-x-4">
        <p className="text-muted-foreground shrink-0">{description}</p>
        <Separator className="flex-auto" />
      </div>
    </header>
  );
}

export default PageHeader;
