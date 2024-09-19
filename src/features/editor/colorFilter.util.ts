import { fabric } from "fabric";
import { FilterEnum } from "./enum";

export const creatFilter = (value: string) => {
	let effect;

	switch (value) {
		case FilterEnum.Grayscale:
			effect = new fabric.Image.filters.Grayscale();
			break;
		case FilterEnum.Saturation:
			effect = new fabric.Image.filters.Saturation({ saturation: 0.7 });
			break;
		case FilterEnum.Polaroid:
			// @ts-ignore
			effect = new fabric.Image.filters.Polaroid();
			break;
		case FilterEnum.Sepia:
			effect = new fabric.Image.filters.Sepia();
			break;
		case FilterEnum.Kodachrome:
			// @ts-ignore
			effect = new fabric.Image.filters.Kodachrome();
			break;
		case FilterEnum.Contrast:
			effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
			break;
		case FilterEnum.Brightness:
			effect = new fabric.Image.filters.Brightness({ brightness: 0.5 });
			break;
		case FilterEnum.Brownie:
			// @ts-ignore
			effect = new fabric.Image.filters.Brownie();
			break;
		case FilterEnum.Vintage:
			// @ts-ignore
			effect = new fabric.Image.filters.Vintage();
			break;
		case FilterEnum.Technicolor:
			// @ts-ignore
			effect = new fabric.Image.filters.Technicolor();
			break;
		case FilterEnum.Pixelate:
			effect = new fabric.Image.filters.Pixelate();
			break;
		case FilterEnum.Invert:
			effect = new fabric.Image.filters.Invert();
			break;
		case FilterEnum.Blur:
			effect = new fabric.Image.filters.Blur();
			break;
		case FilterEnum.Sharpen:
			effect = new fabric.Image.filters.Convolute({
				matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
			});
			break;
		case FilterEnum.Emboss:
			effect = new fabric.Image.filters.Convolute({
				matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
			});
			break;
		case FilterEnum.RemoveColor:
			// @ts-ignore
			effect = new fabric.Image.filters.RemoveColor({
				threshold: 0.2,
				distance: 0.5,
			});
			break;
		case FilterEnum.BlackAndWhite:
			// @ts-ignore
			effect = new fabric.Image.filters.BlackWhite();
			break;
		case FilterEnum.Vibrance:
			// @ts-ignore
			effect = new fabric.Image.filters.Vibrance({ vibrance: 1 });
			break;
		case FilterEnum.BlendColor:
			effect = new fabric.Image.filters.BlendColor({
				color: "#00ff00",
				mode: "multiply",
			});
			break;
		case FilterEnum.HueRotate:
			effect = new fabric.Image.filters.HueRotation({
				rotation: 0.5,
			});
			break;
		case FilterEnum.Resize:
			effect = new fabric.Image.filters.Resize();
			break;
		case FilterEnum.Gamma:
			// @ts-ignore
			effect = new fabric.Image.filters.Gamma({ gamma: [1, 0.5, 2.1] });
			break;
		default:
			effect = null;
			return;
	}

	return effect;
};
