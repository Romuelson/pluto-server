import { INestApplication } from '@nestjs/common/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type OpenApiServers = {
	api: string;
};

export const openApiSetup = (
	app: INestApplication,
	servers: OpenApiServers,
) => {
	const config = new DocumentBuilder()
		.setTitle('Pluto')
		.setDescription('Documentation REST API')
		.setVersion('0.0.1')
		.addServer(servers.api)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(servers.api, app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	});
};
