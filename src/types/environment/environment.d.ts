export interface IEnvPath {
	TEMP_DEST: string;
	PUBLIC_DEST: string;
	ASSETS_DEST: string;
	IMAGES_DEST: string;
	FONTS_DEST: string;
}

export interface IEnvHttp {
	APP_PORT: string;
	APP_HOST: string;
}

export interface IEnvPrefix {
	APP_PREFIX_API: string;
	APP_PREFIX_PUBLIC: string;
	APP_PREFIX_IMAGES: string;
}

export interface IEnvDatabase {
	MONGODB_PORT: string;
	MONGODB_HOST: string;

	MONGODB_TYP: string;
	MONGODB_CZN: string;
	MONGODB_CLR: string;
	MONGODB_LOG: string;
	MONGODB_PWD: string;
	MONGODB_URI: string;
}

export type TEnvUnion = IEnvPath & IEnvHttp & IEnvPrefix & IEnvDatabase;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends TEnvUnion {
			NODE_ENV: 'development' | 'production';
		}
	}
}
