import { cn } from "@/lib/utils";

const ErrorMessage = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  if (!children) return;

  return (
    <span
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default ErrorMessage;
