"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
	AlertTriangle,
	Copy,
	File,
	Loader,
	MoreHorizontal,
	Search,
	Trash,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

export const ProjectsSection = () => {
	const [ConfirmDialog, confirm] = useConfirm(
		"Delete Project",
		"Are you sure you want to delete this project?"
	);
	const router = useRouter();
	const duplicateProject = useDuplicateProject();
	const deleteProject = useDeleteProject();

	const onDelete = async (id: string) => {
		const ok = await confirm();
		if (ok) {
			deleteProject.mutate({ id });
		}
	};
	const onCopy = (id: string) => {
		duplicateProject.mutate({ id });
	};

	const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useGetProjects();

	if (status === "pending") {
		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Recent Projects</h3>
				<div className="flex flex-col gap-y-4 items-center justify-center h-32">
					<Loader className="size-6 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Recent Projects</h3>
				<div className="flex flex-col gap-y-4 items-center justify-center h-32">
					<AlertTriangle className="size-6 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Failed to load projects
					</p>
				</div>
			</div>
		);
	}

	if (!data.pages.length || !data.pages[0].data.length) {
		return (
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Recent Projects</h3>
				<div className="flex flex-col gap-y-4 items-center justify-center h-32">
					<Search className="size-6 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">No projects found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<ConfirmDialog />
			<h3 className="text-lg font-semibold">Recent Projects</h3>
			<Table>
				<TableBody>
					{data.pages.map((group, i) => (
						<React.Fragment key={i}>
							{group.data.map((project) => (
								<TableRow key={project.id}>
									<TableCell
										onClick={() => router.push(`/editor/${project.id}`)}
										className="flex items-center gap-x-2 font-medium cursor-pointer"
									>
										<File className="size-6" />
										{project.name}
									</TableCell>
									<TableCell className="hidden md:table-cell cursor-pointer">
										{project.width}x{project.height} px
									</TableCell>
									<TableCell className="hidden md:table-cell cursor-pointer">
										{formatDistanceToNow(project.updatedAt, {
											addSuffix: true,
										})}
									</TableCell>
									<TableCell className="flex items-center justify-end">
										<DropdownMenu modal={false}>
											<DropdownMenuTrigger asChild>
												<Button disabled={false} size="icon" variant="ghost">
													<MoreHorizontal className="size-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="min-w-60">
												<DropdownMenuItem
													disabled={duplicateProject.isPending}
													onClick={() => onCopy(project.id)}
													className="h-10 cursor-pointer"
												>
													<Copy className="size-4 mr-2" />
													Make a copy
												</DropdownMenuItem>
												<DropdownMenuItem
													disabled={deleteProject.isPending}
													onClick={() => onDelete(project.id)}
													className="h-10 cursor-pointer"
												>
													<Trash className="size-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
			{hasNextPage && (
				<div className="w-full flex items-center justify-center pt-4">
					<Button
						variant="ghost"
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
};
