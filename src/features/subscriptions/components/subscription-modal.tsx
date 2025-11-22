"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { CheckCircle2 } from "lucide-react";

export const SubscriptionModal = () => {
	const { isOpen, onClose } = useSubscriptionModal();

	const features = [
		"Unlimited projects",
		"Unlimited templates",
		"AI Background Removal",
		"AI Image Generation",
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="space-y-4 flex items-center">
					<Image src="/logo.svg" alt="Logo" width={36} height={36} />
					<DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
					<DialogDescription>
						Upgrade to Pro to get access to all features and templates.
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<ul className="space-y-2">
					{features.map((feature, i) => (
						<li className="flex items-center" key={i}>
							<CheckCircle2 className="size-5 mr-2 fill-orange-500 text-white" />
							<p className="text-sm text-muted-foreground">{feature}</p>
						</li>
					))}
				</ul>
				<DialogFooter className="pt-2 mt-4 gap-y-2">
					<Button className="w-full" onClick={() => {}} disabled={false}>
						Upgrade
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
