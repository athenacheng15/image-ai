import type { Editor } from "@/features/editor/type";

import { Minimize, ZoomIn, ZoomOut } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface FooterProps {
	editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
	const controls = [
		{
			label: "Reset",
			action: () => editor?.autoZoom(),
			Icon: Minimize,
		},
		{
			label: "Zoom in",
			action: () => editor?.zoomIn(),
			Icon: ZoomIn,
		},
		{
			label: "Zoom out",
			action: () => editor?.zoomOut(),
			Icon: ZoomOut,
		},
	];

	return (
		<footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px4 flex-row-reverse">
			{controls.map((control) => {
				const Icon = control.Icon;
				return (
					<Hint
						key={control.label}
						label={control.label}
						side="top"
						sideOffset={10}
					>
						<Button
							onClick={control.action}
							size="icon"
							variant="ghost"
							className="h-full"
						>
							<Icon className="size-4" />
						</Button>
					</Hint>
				);
			})}
		</footer>
	);
};
