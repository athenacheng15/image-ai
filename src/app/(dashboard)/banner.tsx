"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";

export const Banner = () => {
	const router = useRouter();
	const mutation = useCreateProject();

	const onClick = () => {
		mutation.mutate(
			{
				name: "New Project",
				json: "",
				height: 1200,
				width: 900,
			},
			{
				onSuccess: ({ data }) => {
					router.push(`/editor/${data.id}`);
				},
			}
		);
	};

	return (
		<div className="text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#d66d3f] via-[#f26c23] to-[#f39f5f]">
			<div className="rounded-full size-28 items-center justify-center bg-white/50 hidden md:flex">
				<div className="rounded-full size-20 flex items-center justify-center bg-white">
					<Sparkles className=" h-20 text-[#f26c23] fill-[#f26c23]" />
				</div>
			</div>
			<div className="flex flex-col gap-y-2">
				<h1 className="text-xl md:text-3xl font-semibold">
					Visualize Your Ideas with AI
				</h1>
				<p className="text-xs md:text-sm mb-2">
					Use AI to visualize your ideas and create stunning images.
				</p>
				<Button
					disabled={mutation.isPending}
					onClick={onClick}
					variant="secondary"
					className="w-[160px]"
				>
					Get Started
					<ArrowRight className="size-4 ml-2" />
				</Button>
			</div>
		</div>
	);
};
