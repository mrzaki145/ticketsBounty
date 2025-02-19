import { MessageSquareWarningIcon } from "lucide-react";
import { cloneElement, type ReactElement } from "react";

type PlaceholderProps = {
  title: string;
  description?: string;
  icon?: ReactElement;
};

function Placeholder({
  title,
  description,
  icon = <MessageSquareWarningIcon />,
}: PlaceholderProps) {
  const IconCom = cloneElement(icon, {
    className: "size-10 mb-4",
  } as React.HTMLAttributes<SVGElement>);

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      {IconCom}
      <h2 className="text-xl text-center">{title}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground text-center">{description}</p>
      )}
    </div>
  );
}

export default Placeholder;
