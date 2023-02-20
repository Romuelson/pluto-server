import { Injectable } from '@nestjs/common';

// import * as sharp from 'sharp';
import { ensureDir, writeFile } from 'fs-extra';
// import compose from 'compose-function';

import { MFile } from '../classes/mfile.class';
import { EExtensionType, EMediaType } from '../enum/image.enum';

import {
	TImagesEXT,
	TImagesURL,
	TImageSave,
	TImageWrite,
	TImageResizeProps,
	TImageConvertProps,
	TImageTransformProps,
} from '../interfaces/image.interface';

@Injectable()
export class ImageService {
	mediaTypes: EMediaType[];
	imageExtensions: EExtensionType[];

	constructor() {
		this.mediaTypes = Object.values(EMediaType);
		this.imageExtensions = Object.values(EExtensionType);
	}

	async toMap(list: Buffer[]) {
		return this.imageExtensions.reduce(
			(init, ext, i) => init.set(ext, list[i]),
			new Map() as Map<EExtensionType, Buffer>,
		);
	}

	async parseMediaTypes(imageExt: TImagesEXT[]) {
		return this.mediaTypes.reduce((init, type, i) => {
			init[type] = imageExt[i];
			return init;
		}, {} as TImagesURL<TImagesEXT>);
	}

	async convert(props: TImageConvertProps) {
		const { file, options } = props;
		const { buffer, ...otherProps } = file;

		const methods: TImagesEXT<() => Promise<Buffer>> = {
			// [EExtensionType.JPEG]: async () => await sharp(buffer).jpeg(options.jpeg).toBuffer(),
			// [EExtensionType.WEBP]: async () => await sharp(buffer).webp(options.webp).toBuffer(),
			// [EExtensionType.AVIF]: async () => await sharp(buffer).avif(options.avif).toBuffer(),

			[EExtensionType.PNG]: async () => buffer,
			[EExtensionType.JPEG]: async () => buffer,
			[EExtensionType.WEBP]: async () => buffer,
			[EExtensionType.AVIF]: async () => buffer,
		};

		return new MFile({ ...otherProps, buffer: await methods[file.extension]() });

		// const createExtension = async (extension: EExtensionType) =>
		// 	new MFile({ ...otherProps, buffer: await methods[extension](), extension })

		// const createExtensions = async () =>
		// 	await Promise.all(this.imageExtensions.map((extension) =>
		// 		await createExtension(extension)))

		// return extension ? await createExtension(extension) : await createExtensions()
	}

	async resize(props: TImageResizeProps) {
		const { file, options } = props;
		const { buffer, ...otherProps } = file;

		// const resize = async (buffer: Buffer) => await sharp(buffer).resize(options).toBuffer();
		const resize = async (buffer: Buffer) => buffer;

		return new MFile({ ...otherProps, buffer: await resize(buffer) });
	}

	async transform(props: TImageTransformProps) {
		const convert = async (file: MFile) =>
			await this.convert({ file, options: props.options.convert });

		const resize = async (file: MFile) =>
			await this.resize({ file, options: props.options.resize });

		const composition = await resize(await convert(props.file));

		// const composScope = [resize, convert] as const;
		// const composition = await compose(resize, convert)(file);

		return new MFile({ ...composition });
	}

	async write({ file, paths }: TImageWrite) {
		const { buffer, filename, extension, mediaType, fieldname } = file;

		const originalname = `${filename}.${extension}`;

		const path = `${mediaType}/${fieldname}/${filename}`;
		const downloadUrl = `${paths.prefixUrl}/${path}/${originalname}`;

		const writeDir = `${paths.prefixDir}/${path}`;
		const writePath = `${writeDir}/${originalname}`;

		await ensureDir(writeDir);
		await writeFile(writePath, buffer);

		return new MFile({ ...file, originalname, path: writePath, downloadUrl });
	}

	async save({ paths, file, options }: TImageSave) {
		return await this.write({ file: await this.transform({ file, options }), paths });
	}
}
