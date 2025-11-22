"use client";

import { AlertTriangle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import {
	useGetTemplates,
	ResponseType,
} from "@/features/projects/api/use-get-templates";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

import { TemplateCard } from "./template-card";

export const TemplatesSection = () => {
	const router = useRouter();
	const createProject = useCreateProject();
	const { shouldBlock, triggerPaywall } = usePaywall();

	const { data, status, isLoading, isError } = useGetTemplates({
		page: "1",
		limit: "4",
	});

	const onClick = (template: ResponseType["data"][0]) => {
		if (shouldBlock || template.isPro) {
			triggerPaywall();
			return;
		}
		createProject.mutate(
			{
				name: `${template.name} Project`,
				json: template.json,
				height: template.height,
				width: template.width,
			},
			{
				onSuccess: ({ data }) => {
					router.push(`/editor/${data.id}`);
				},
			}
		);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Start from a template</h3>
				<div className="flex items-center justify-center h-32">
					<Loader className="size-6 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Start from a template</h3>
				<div className="flex flex-col gap-y-4 items-center justify-center h-32">
					<AlertTriangle className="size-6 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Failed to load templates
					</p>
				</div>
			</div>
		);
	}

	if (!data?.length) {
		return null;
	}

	return (
		<div>
			<h3 className="text-lg font-semibold">Start from a template</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
				{data?.map((template) => (
					<TemplateCard
						key={template.id}
						title={template.name}
						imageSrc={template.thumbnailUrl || ""}
						onClick={() => onClick(template)}
						disabled={createProject.isPending}
						description={`${template.width}x${template.height}px`}
						width={template.width}
						height={template.height}
						isPro={template.isPro}
					/>
				))}
			</div>
		</div>
	);
};
