"use client";

import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Button } from "@/components/ui/button";

interface EditorProjectIdPageProps {
	params: {
		projectId: string;
	};
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
	const { projectId } = params;
	const { data, isLoading, isError } = useGetProject(projectId);

	if (isLoading || !data) {
		return (
			<div className="h-full flex flex-col items-center">
				<Loader className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}
	if (isError) {
		return (
			<div className="h-full flex flex-col gap-y-5 items-center">
				<TriangleAlert className="size-6  text-muted-foreground" />
				<p className="text-muted-foreground text-sm">Failed to fetch project</p>
				<Button variant="secondary" asChild>
					<Link href="/">Back to Home</Link>
				</Button>
			</div>
		);
	}

	return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
