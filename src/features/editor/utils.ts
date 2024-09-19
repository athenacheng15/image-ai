import { RGBColor } from "react-color";

export function isTextType(type: string | undefined) {
	return type === "test" || type === "i-text" || type === "textbox";
}

export function isImageType(type: string | undefined) {
	return type === "image";
}

export function rgbaObjToString(rgba: RGBColor | "transparent") {
	if (rgba === "transparent") {
		return `rgba(0,0,0,0)`;
	}

	const alpha = rgba.a === undefined ? 1 : rgba.a;
	return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}

