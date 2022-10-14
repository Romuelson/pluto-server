import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

!(async () => {
	const PORT = parseInt(process.env.PORT || '80', 10);

	const app = await NestFactory.create(AppModule);

	await app.listen(PORT, () => `[Nest]: started on port - ${PORT}`);
})();
