"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

const BProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="#539fc6"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressProvider;
