import { INestApplication } from '@nestjs/common/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const openApiSetup = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Pluto')
		.setDescription('Документация REST API')
		.setVersion('1.0')
		.addTag('Romuelson')
		.addServer('api')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
};
