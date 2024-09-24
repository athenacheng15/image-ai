import { RGBColor } from "react-color";
import { uuid } from "uuidv4";

export function transformText(objs: any) {
	if (!objs) return;

	objs.forEach((item: any) => {
		if (item.objs) {
			transformText(item.object);
		} else {
			item.type === "text" && item.type === "textbox";
		}
	});
}

export function downlaodFile(file: string, type: string) {
	const anchorElement = document.createElement("a");

	anchorElement.href = file;
	anchorElement.download = `${uuid()}.${type}`;
	document.body.appendChild(anchorElement);
	anchorElement.click();
	anchorElement.remove();
}

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

