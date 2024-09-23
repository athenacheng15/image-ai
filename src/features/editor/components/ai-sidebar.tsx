import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/type";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";

interface AiSidebarProps {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: AiSidebarProps) => {
	const mutation = useGenerateImage();

	const [value, setValue] = useState("");

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//TODO: Block with paywall

		mutation.mutate(
			{ prompt: value },
			{
				onSuccess: ({ data }) => {
					editor?.addImage(data);
				},
			}
		);
	};
	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
				activeTool === "ai" ? "visible" : "hidden"
			)}
		>
			<ToolSidebarHeader title="AI" description="Generate an image using AI" />
			<ScrollArea>
				<form onSubmit={onSubmit} className="space-y-6 p-4">
					<Textarea
						disabled={mutation.isPending}
						value={value}
						placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
						cols={30}
						rows={10}
						required
						minLength={3}
						onChange={(e) => setValue(e.target.value)}
					/>
					<Button
						disabled={mutation.isPending}
						type="submit"
						className="w-full"
					>
						Generate
					</Button>
				</form>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
