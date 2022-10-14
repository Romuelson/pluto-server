import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				`.env/.env.${process.env.NODE_ENV}`,
				`.env/.env.${process.env.NODE_ENV}.local`,
			],
			load: configuration,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
