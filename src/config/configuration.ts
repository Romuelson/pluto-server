import { registerAs } from '@nestjs/config';

const {
	NODE_ENV,
	APP_PORT,
	APP_HOST,
	MONGODB_URI,
	MONGODB_HOST,
	MONGODB_PORT,
} = process.env;

export const appHttpCofnig = registerAs('http', () => ({
	port: APP_PORT,
	host: APP_HOST,
}));

export const appDatabaseConfig = registerAs('database', () => ({
	uri: MONGODB_URI,
	host: MONGODB_HOST,
	port: MONGODB_PORT,
}));

export const configOptions = () => ({
	cache: true,
	expandVariables: true,
	envFilePath: [`.env/.env.${NODE_ENV}`, `.env/.env.${NODE_ENV}.local`],
	load: [appHttpCofnig, appDatabaseConfig],
});
