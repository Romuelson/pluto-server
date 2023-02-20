import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { diskStorage, StorageEngine } from 'multer';

// import { format } from 'date-fns';
import { ensureDirSync } from 'fs-extra';

import { EHttpException } from 'src/common/exceptions/http-exception.enum';
import { TConfigService } from './interfaces/config.interface';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
	constructor(private configService: ConfigService<TConfigService>) {}

	createMulterOptions(): MulterModuleOptions {
		const { dirTemp } = this.configService.get('dirPath', { infer: true })!;

		const storage: StorageEngine = diskStorage({
			destination: function (req, file, callback) {
				ensureDirSync(dirTemp);
				callback(null, dirTemp);
			},
			filename: function (req, file, callback) {
				// callback(null, `${format(Date.now(), 'yyyy-MM-dd')}-${file.originalname}`);
				callback(null, file.originalname);
			},
		});

		const imageFileFilter: MulterOptions['fileFilter'] = (req, file, callback) => {
			const allowedExtensions = new RegExp(/.(jpg|jpeg|png)$/gi);

			const isExtensions = file.originalname.match(allowedExtensions);
			// const isMimeType = file.mimetype.includes('image');

			// if (isExtensions && isMimeType) return callback(null, true);
			if (isExtensions) return callback(null, true);

			callback(new HttpException(EHttpException.create, HttpStatus.NO_CONTENT), false);
		};

		return { storage, fileFilter: imageFileFilter };
	}
}
