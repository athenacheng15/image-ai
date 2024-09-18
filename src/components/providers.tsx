//inject sever component as childern inside a client component
"use client";

import { QueryProvider } from "@/components/query-provider";

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return <QueryProvider>{children}</QueryProvider>;
};
