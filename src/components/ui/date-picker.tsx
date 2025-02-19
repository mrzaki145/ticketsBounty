"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

export function DatePicker({ id, name, defaultValue }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  const FormatedLabel = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {FormatedLabel ? (
            <span>{FormatedLabel}</span>
          ) : (
            <span>Pick a date</span>
          )}
          <input type="hidden" name={name} id={id} value={FormatedLabel} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
