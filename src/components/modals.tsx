"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { useState } from "react";
import { useEffect } from "react";

export const Modals = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<SubscriptionModal />
		</>
	);
};
