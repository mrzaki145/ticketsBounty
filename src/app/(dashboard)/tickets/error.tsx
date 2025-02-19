"use client";

import Placeholder from "@/components/layout/placeholder";

type TicketsErrorPageProps = {
  error: Error;
  reset: () => void;
};

function TicketsErrorPage({}: TicketsErrorPageProps) {
  return <Placeholder title={"Something went wrong"} />;
}

export default TicketsErrorPage;
