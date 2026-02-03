"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";
import { queryClient } from "@/lib/query-client";
import { useState } from "react";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
   const [qc] = useState(() => queryClient);

	return (
		<QueryClientProvider client={qc}>
			{children}
			<Toaster />
		</QueryClientProvider>
	);
}

const Toaster = () => <SonnerToaster />;
