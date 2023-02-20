import * as sharp from 'sharp';

import { TObjectMap } from 'src/types/main.type';

import { MFile } from '../classes/mfile.class';
import { EExtensionType, EMediaType } from '../enum/image.enum';

export type TImagesEXT<T = string> = TObjectMap<EExtensionType, T>;
export type TImagesURL<T = TImagesEXT> = TObjectMap<EMediaType, T>;

/* ImageConfig */
export type TImageConfigOptions = {
	convert: TImageConvertOptions;
	resize: TImageResizeOptions;
};

/* Convert */
export type TImageConvertOptions = {
	png: sharp.PngOptions;
	jpeg: sharp.JpegOptions;
	webp: sharp.WebpOptions;
	avif: sharp.AvifOptions;
};

export type TImageConvertProps = {
	file: MFile;
	options: TImageConvertOptions;
};

/* Resize */
export type TImageResizeOptions = sharp.ResizeOptions;

export type TImageResizeProps = {
	file: MFile;
	options: TImageResizeOptions;
};

/* Transform */
export type TImageTransformOptions = TImageConfigOptions;

export type TImageTransformProps = {
	file: MFile;
	options: TImageTransformOptions;
};

/* writeExtensions */
export type TWriteExtensionPaths = {
	dir: string;
	url: string;
};

export type TWriteExtensions = {
	extensions: TImagesEXT<MFile>;
	paths: TWriteExtensionPaths;
};

/* createMediaType */
export type TMediaTypeGet = Promise<TImagesURL<MFile | Map<EExtensionType, MFile>>>;

export type TMediaTypePaths = {
	prefixDir: string;
	prefixUrl: string;
};

export type TCreateMediaType = {
	file: MFile;
	paths: TMediaTypePaths;
	mediaType?: EMediaType;
	options?: TImageTransformOptions;
};

/* write */
export type TImageWrite = {
	file: MFile;
	paths: TMediaTypePaths;
};

/* save */
export type TImageSave = TImageTransformProps & {
	paths: TMediaTypePaths;
};
