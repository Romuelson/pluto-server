import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { configSetup } from './config/config';
import { openApiSetup } from './common/openapi/openapi-setup';

!(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const { configPath, configHttp, configPrefix, configValidate } = await configSetup(app);

	openApiSetup(app, { api: configPrefix.appPrefixApi });

	app.setGlobalPrefix(configPrefix.appPrefixApi);
	app.useStaticAssets(configPath.dirPublic, { prefix: configPrefix.appPrefixPublic });
	// app.useGlobalPipes(new ValidationPipe(configValidate));
	app.enableCors();

	await app.listen(configHttp.port);
})();
