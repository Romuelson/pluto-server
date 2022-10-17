import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { openApiSetup } from './common/openapi/openapi-setup';
import { ConfigurationService } from './config/configuration.service';

!(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const { port } = app.get(ConfigurationService).httpConfig();

	openApiSetup(app);

	app.setGlobalPrefix('api');
	// app.enableCors();

	await app.listen(port, () => `[Nest]: started on port - ${port}`);
})();
