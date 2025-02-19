import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: string | React.ReactNode;
};

function CardCompact({ title, description, children, footer }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default CardCompact;
