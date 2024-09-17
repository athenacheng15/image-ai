import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";

import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";
import {
	BuildEditorProps,
	CIRCLE_OPTIONS,
	DAIMOND_OPTIONS,
	Editor,
	EditorHookProps,
	FILL_COLOR,
	FONT_FAMILY,
	FONT_WEIGHT,
	RECTANGLE_OPTIONS,
	STROKE_COLOR,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
	TEXT_OPTIONS,
	TRIANGLE_OPTIONS,
} from "@/features/editor/type";
import { isTextType } from "@/features/editor/utils";

const buildEditor = ({
	canvas,
	fontFamily,
	fillColor,
	strokeColor,
	strokeWidth,
	strokeDashArray,
	setFontFamily,
	setFillColor,
	setStrokeColor,
	setStrokeWidth,
	setStrokeDashArray,
	selectedObjs,
}: BuildEditorProps): Editor => {
	const getWorkspace = () => {
		return canvas.getObjects().find((obj) => obj.name === "clip");
	};
	const center = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const centerPoint = workspace?.getCenterPoint();

		if (!centerPoint) return;

		// @ts-ignore
		canvas._centerObject(object, centerPoint);
	};

	const addToCanvas = (object: fabric.Object) => {
		center(object);
		canvas.add(object);
		canvas.setActiveObject(object);
	};
	return {
		addText: (value, options) => {
			const object = new fabric.Textbox(value, {
				...TEXT_OPTIONS,
				fill: fillColor,
				...options,
			});
			addToCanvas(object);
		},
		getActiveOpacity: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return 1;
			}
			const value = selectedObj.get("opacity") || 1;

			return value;
		},
		changeFontWeight: (value: number) => {
			canvas.getActiveObjects().forEach((obj) => {
				if (isTextType(obj.type)) {
					// @ts-ignore
					// Faulty TS library, fontWeight exisits.
					obj.set({ fontWeight: value });
				}
			});
			canvas.renderAll();
		},
		changeOpacity: (value: number) => {
			canvas.getActiveObjects().forEach((obj) => {
				obj.set({ opacity: value });
			});
			canvas.renderAll();
		},
		bringForward: () => {
			canvas.getActiveObjects().forEach((obj) => {
				canvas.bringForward(obj);
			});
			canvas.renderAll();
			const workspace = getWorkspace();
			workspace?.sendToBack();
		},
		sendBackwards: () => {
			canvas.getActiveObjects().forEach((obj) => {
				canvas.sendBackwards(obj);
			});
			canvas.renderAll();
			const workspace = getWorkspace();
			workspace?.sendToBack();
		},
		changeFontFamily: (value: string) => {
			setFontFamily(value);
			canvas.getActiveObjects().forEach((obj) => {
				if (isTextType(obj.type)) {
					// @ts-ignore
					// Faulty TS library, fontFamily exisits.
					obj.set({ fontFamily: value });
				}
			});
			canvas.renderAll();
		},
		changeFillColor: (value: string) => {
			setFillColor(value);
			canvas.getActiveObjects().forEach((obj) => obj.set({ fill: value }));
			canvas.renderAll();
		},
		changeStrokeColor: (value: string) => {
			setStrokeColor(value);
			canvas.getActiveObjects().forEach((obj) => {
				// Text types don't have stroke
				if (isTextType(obj.type)) {
					obj.set({ fill: "value" });
				}
				obj.set({ stroke: value });
			});
			canvas.renderAll();
		},
		changeStrokeWidth: (value: number) => {
			setStrokeWidth(value);
			canvas
				.getActiveObjects()
				.forEach((obj) => obj.set({ strokeWidth: value }));
			canvas.renderAll();
		},
		changeStrokeDashArray: (value: number[]) => {
			setStrokeDashArray(value);
			canvas
				.getActiveObjects()
				.forEach((obj) => obj.set({ strokeDashArray: value }));
			canvas.renderAll();
		},
		addCircle: () => {
			const object = new fabric.Circle({
				...CIRCLE_OPTIONS,
				fill: fillColor, // If not want to keep new item show as same as last style, just remove
				stroke: strokeColor,
				strokeWidth,
				strokeDashArray,
			});
			addToCanvas(object);
		},
		addSoftRentangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
				rx: 50,
				ry: 50,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth,
				strokeDashArray,
			});
			addToCanvas(object);
		},
		addRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth,
				strokeDashArray,
			});
			addToCanvas(object);
		},
		addTriangle: () => {
			const object = new fabric.Triangle({
				...TRIANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth,
				strokeDashArray,
			});
			addToCanvas(object);
		},
		addInverseTriangle: () => {
			const HEIGHT = TRIANGLE_OPTIONS.height;
			const WIDTH = TRIANGLE_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					{ x: 0, y: 0 },
					{ x: WIDTH, y: 0 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{
					...TRIANGLE_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth,
					strokeDashArray,
				}
			);

			addToCanvas(object);
		},
		addDiamond: () => {
			const HEIGHT = DAIMOND_OPTIONS.height;
			const WIDTH = DAIMOND_OPTIONS.width;
			const object = new fabric.Polygon(
				[
					{ x: WIDTH / 2, y: 0 },
					{ x: WIDTH, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: HEIGHT },
					{ x: 0, y: HEIGHT / 2 },
				],
				{
					...DAIMOND_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth,
					strokeDashArray,
				}
			);

			addToCanvas(object);
		},
		canvas,
		getActiveFontFamily: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return fontFamily;
			}
			// @ts-ignore
			// Faulty TS library, fontFamily exisits.
			const value = selectedObj.get("fontFamily") || fontFamily;
			return value;
		},
		getActiveFontWeight: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return FONT_WEIGHT;
			}
			// @ts-ignore
			// Faulty TS library, fontWeight exisits.
			const value = selectedObj.get("fontWeight") || FONT_WEIGHT;
			return value;
		},
		getActiveFillColor: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return fillColor;
			}
			const value = selectedObj.get("fill") || fillColor;

			// Currentiy, gradients and patterns are not supported
			return value as string;
		},
		getActiveStrokeColor: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return strokeColor;
			}
			const value = selectedObj.get("stroke") || strokeColor;

			return value;
		},
		getActiveStrokeWidth: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return strokeWidth;
			}
			const value = selectedObj.get("strokeWidth") || strokeWidth;

			return value;
		},
		getActiveStrokeDashArray: () => {
			const selectedObj = selectedObjs[0];
			if (!selectedObj) {
				return strokeDashArray;
			}
			const value = selectedObj.get("strokeDashArray") || strokeDashArray;

			return value;
		},
		selectedObjs,
	};
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const [selectedObjs, setSelectedObjs] = useState<fabric.Object[]>([]);

	const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
	const [fillColor, setFillColor] = useState(FILL_COLOR);
	const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
	const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
	const [strokeDashArray, setStrokeDashArray] =
		useState<number[]>(STROKE_DASH_ARRAY);

	useAutoResize({ canvas, container });

	useCanvasEvents({ canvas, setSelectedObjs, clearSelectionCallback });

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				canvas,
				fontFamily,
				fillColor,
				strokeColor,
				strokeWidth,
				strokeDashArray,
				setFontFamily,
				setFillColor,
				setStrokeColor,
				setStrokeWidth,
				setStrokeDashArray,
				selectedObjs,
			});
		}
		return undefined;
	}, [
		canvas,
		fontFamily,
		fillColor,
		strokeColor,
		strokeWidth,
		strokeDashArray,
		selectedObjs,
	]);

	const init = useCallback(
		({
			initialCanvas,
			initialContainer,
		}: {
			initialCanvas: fabric.Canvas;
			initialContainer: HTMLDivElement;
		}) => {
			fabric.Object.prototype.set({
				cornerColor: "#FFF",
				cornerStyle: "circle",
				borderColor: "#3b82f6",
				borderScaleFactor: 1.5,
				transparentCorners: false,
				borderOpacityWhenMoving: 1,
				cornerStrokeColor: "#3b82f6",
			});

			const initailWorkspace = new fabric.Rect({
				width: 900,
				height: 1200,
				name: "clip",
				fill: "white",
				selectable: false,
				hasControls: false,
				shadow: new fabric.Shadow({
					color: "rgba(0,0,0,0.8)",
					blur: 5,
				}),
			});
			initialCanvas.setWidth(initialContainer.offsetWidth);
			initialCanvas.setHeight(initialContainer.offsetHeight);

			initialCanvas.add(initailWorkspace);
			initialCanvas.centerObject(initailWorkspace);
			initialCanvas.clipPath = initailWorkspace;

			setCanvas(initialCanvas);
			setContainer(initialContainer);
		},
		[]
	);
	return { init, editor };
};
