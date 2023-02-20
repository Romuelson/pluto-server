import { path } from 'app-root-path';

import { INestApplication, ValidationPipeOptions } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';

import { IEnvDatabase, IEnvHttp, IEnvPath, IEnvPrefix } from 'src/types/environment/environment';

import {
	IHttpConfig,
	IMongodbConfig,
	IDirPathConfig,
	IPrefixConfig,
} from './interfaces/config.interface';
import { EConfigServices } from './enum/config.enum';

export const configSetup = async (app: INestApplication) => {
	await ConfigModule.envVariablesLoaded;

	const config = app.get<ConfigService>(ConfigService);

	return {
		configPath: config.get<IDirPathConfig>(EConfigServices.DIR_PATH)!,
		configHttp: config.get<IHttpConfig>(EConfigServices.HTTP)!,
		configPrefix: config.get<IPrefixConfig>(EConfigServices.PREFIX)!,
		configValidate: config.get<ValidationPipeOptions>(EConfigServices.VALIDATE)!,
	};
};

export const appPathConfig = registerAs(EConfigServices.DIR_PATH, (): IDirPathConfig => {
	const { TEMP_DEST, PUBLIC_DEST, ASSETS_DEST, IMAGES_DEST, FONTS_DEST } =
		process.env as IEnvPath;

	return {
		dirTemp: `${path}${TEMP_DEST}`,
		dirPublic: `${path}${PUBLIC_DEST}`,
		dirAssets: `${path}${ASSETS_DEST}`,
		dirImages: `${path}${IMAGES_DEST}`,
		dirFonts: `${path}${FONTS_DEST}`,
	};
});

export const appHttpCofnig = registerAs(EConfigServices.HTTP, (): IHttpConfig => {
	const { APP_PORT, APP_HOST } = process.env as IEnvHttp;

	return {
		port: parseInt(APP_PORT, 10),
		host: APP_HOST,
	};
});

export const appPrefixCofnig = registerAs(EConfigServices.PREFIX, (): IPrefixConfig => {
	const { APP_PREFIX_API, APP_PREFIX_PUBLIC, APP_PREFIX_IMAGES } = process.env as IEnvPrefix;

	return {
		appPrefixApi: APP_PREFIX_API,
		appPrefixPublic: APP_PREFIX_PUBLIC,
		appPrefixImages: APP_PREFIX_IMAGES,
	};
});

export const appDatabaseConfig = registerAs(EConfigServices.DATABASE, (): IMongodbConfig => {
	const { MONGODB_URI, MONGODB_HOST, MONGODB_PORT } = process.env as IEnvDatabase;

	return {
		uri: MONGODB_URI,
		host: MONGODB_HOST,
		port: parseInt(MONGODB_PORT, 10),
	};
});

export const appValidateConfig = registerAs(
	EConfigServices.VALIDATE,
	() => ({ whitelist: true, forbidNonWhitelisted: true } as ValidationPipeOptions),
);
