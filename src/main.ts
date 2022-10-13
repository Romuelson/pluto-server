import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { configuration } from './config/configuration';

!(async () => {
	const { port } = configuration();

	const app = await NestFactory.create(AppModule);
	await app.listen(port, () => `[Nest]: started on port - ${port}`);
})();
