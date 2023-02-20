import { Types } from 'mongoose';

import { EExtensionType, EMediaType } from 'src/modules/file/enum/image.enum';

import { TFileFields } from 'src/modules/file/interfaces/file.interface';
import { TImagesURL, TImageTransformOptions } from 'src/modules/file/interfaces/image.interface';

export type TImageConfig = {
	options: TImagesURL<TImageTransformOptions>;
};

export type TImagesFileResult = {
	filename: string;
};

export type ICreateInstanceImagesDTO = Partial<IInstanceImageFiles<string>>;

export interface IInstanceImageFiles<T = TImagesFileResult> {
	frontside: T;
	backside: T;

	overallFrontside: T;
	overallBackside: T;

	productFrontside: T;
	productBackside: T;
}

export interface IInstanceImage {
	instance_id: Types.ObjectId;
	filename: string;
	mediaTypes: typeof EMediaType;
	extencionTypes: typeof EExtensionType;
}

/* create */
export type TInstanceImageProps = Pick<IInstanceImage, 'instance_id'> & {
	fileFields: TFileFields<keyof IInstanceImageFiles>;
};

/* save */
export type TInstanceImageSave = {
	fileFields: TFileFields<keyof IInstanceImageFiles>;
	instance_id: string;
};
