import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Loader } from "lucide-react";

import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/type";
import { useGetImages } from "@/features/images/api/use-get-images";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";

interface ImageSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: ImageSidebarProps) => {
	const { data, isLoading, isError } = useGetImages();
	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "images" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader
				title="Images"
				description="Add images to your canvas"
			/>
			<div className="p-4 border-b">
				<UploadButton
					appearance={{
						button: "w-full test-sm font-medium",
						allowedContent: "hidden",
					}}
					content={{ button: "Upload Image" }}
					endpoint="imageUploader"
					onClientUploadComplete={(res) => editor?.addImage(res[0].url)}
				/>
			</div>
			{isLoading && (
				<div className="flex items-center justify-center flex-1">
					<Loader className="size-4 text-muted-foreground animate-spin" />
				</div>
			)}
			{isError && (
				<div className="flex flex-col gap-y-4 items-center justify-center flex-1">
					<AlertTriangle className="size-4 text-muted-foreground" />
					<p className="text-muted-foreground text-xs">
						Failed to fetch images
					</p>
				</div>
			)}
			<ScrollArea>
				<div className="p-4">
					<div className="grid grid-cols-2 gap-2">
						{data &&
							data.map((img) => {
								return (
									<button
										onClick={() => editor?.addImage(img.urls.regular)}
										key={img.id}
										className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
									>
										<Image
											fill
											src={img.urls.small}
											alt={img.alt_description || "Image"}
											className="object-cover"
										/>
										<Link
											href={img.links.html}
											target="_blank"
											className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
										>
											{img.user.name}
										</Link>
									</button>
								);
							})}
					</div>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
