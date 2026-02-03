"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster as SonnerToaster } from "sonner";
import GlobalSheet from "@/components/global-sheet";
import { queryClient } from "@/lib/query-client";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [qc] = useState(() => queryClient);

  return (
    <QueryClientProvider client={qc}>
      {children}
      <GlobalSheet />
      <Toaster />
    </QueryClientProvider>
  );
}

const Toaster = () => <SonnerToaster />;
