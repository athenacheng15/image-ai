"use client";

import { useGetTemplates } from "@/features/projects/api/use-get-templates";
import { AlertTriangle, Loader } from "lucide-react";
import { TemplateCard } from "./template-card";

export const TemplatesSection = () => {
	const { data, status, isLoading, isError } = useGetTemplates({
		page: "1",
		limit: "4",
	});

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
						onClick={() => {}}
						disabled={false}
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
