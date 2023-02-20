import { ValidationPipeOptions } from '@nestjs/common';

export interface IDirPathConfig {
	dirTemp: string;
	dirPublic: string;
	dirAssets: string;
	dirImages: string;
	dirFonts: string;
}

export interface IHttpConfig {
	port: number;
	host: string;
}

export interface IPrefixConfig {
	appPrefixApi: string;
	appPrefixPublic: string;
	appPrefixImages: string;
}

export interface IMongodbConfig {
	uri: string;
	host: string;
	port: number;
}

export type TConfigService = {
	http: IHttpConfig;
	dirPath: IDirPathConfig;
	database: IMongodbConfig;
	validate: ValidationPipeOptions;
	prefix: IPrefixConfig;
};
