import { Model, Types } from 'mongoose';
import { readFile } from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TConfigService } from 'src/config/interfaces/config.interface';
import { EHttpException } from 'src/common/exceptions/http-exception.enum';

import { MFile } from '../file/classes/mfile.class';
import { TFileMulter } from '../file/interfaces/file.interface';
import { EExtensionType, EMediaType } from '../file/enum/image.enum';

import { ImageService } from '../file/services/image.service';

import { InstanceImageConfig } from './config/instance-image.config';
import { InstanceImage, InstanceImageDocument } from './schemas/instance-image.schema';

import {
	IInstanceImage,
	TInstanceImageSave,
	TInstanceImageProps,
} from './interfaces/instance-image.interface';

@Injectable()
export class InstanceImageService {
	mediaTypes: EMediaType[];
	imageExtensions: EExtensionType[];

	constructor(
		@InjectModel(InstanceImage.name) private instanceImageModel: Model<InstanceImageDocument>,
		private readonly configService: ConfigService<TConfigService>,
		private readonly imageService: ImageService,
	) {
		this.mediaTypes = Object.values(EMediaType);
		this.imageExtensions = Object.values(EExtensionType);
	}
	// : Promise<ImagesInstance>
	async saveMany({ fileFields, instance_id }: TInstanceImageSave) {
		// if (!magicNumber(fileFields))
		// 	throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);

		const filename = uuidv4();

		const { dirImages } = this.configService.get('dirPath', { infer: true })!;
		const { appPrefixImages } = this.configService.get('prefix', { infer: true })!;

		const { options } = InstanceImageConfig();

		// const collector: TFileFields<string, ImagesInstanceFile> = {};

		let field: keyof typeof fileFields;
		for (field in fileFields) {
			const createExtensions = async (file: TFileMulter, mediaType: EMediaType) => {
				await Promise.all(
					this.imageExtensions.map(async (extension) => {
						await this.imageService.save({
							file: new MFile({
								...file,
								mediaType,
								extension,
							}),
							options: options[mediaType],
							paths: {
								prefixDir: `${dirImages}/${instance_id}`,
								prefixUrl: `${appPrefixImages}${instance_id}`,
							},
						});
					}),
				);
			};

			const createMediaTypes = async (file: TFileMulter) => {
				await Promise.all(
					this.mediaTypes.map(
						async (mediaType) => await createExtensions(file, mediaType),
					),
				);
			};

			await Promise.all(
				fileFields[field].map(async (file) => {
					const buffer = await readFile(file.path);

					const nFile = { ...file, buffer, filename } as TFileMulter;
					await createMediaTypes(nFile);

					// collector[field] = { filename: nFile.filename };
				}),
			);
		}

		return filename;
	}

	async create(props: TInstanceImageProps): Promise<InstanceImageDocument> {
		const { fileFields, instance_id } = props;

		try {
			const filename = await this.saveMany({ fileFields, instance_id: String(instance_id) });

			const model: IInstanceImage = {
				instance_id,
				filename,
				mediaTypes: EMediaType,
				extencionTypes: EExtensionType,
			};

			return await new this.instanceImageModel(model).save();
		} catch (error) {
			throw new HttpException(EHttpException.create, HttpStatus.NO_CONTENT);
		}
	}

	async isIdsExists(ids: Types.ObjectId[]): Promise<boolean> {
		const count = await this.instanceImageModel.countDocuments({ _id: { $in: ids } });
		return count === ids.length;
	}
}
