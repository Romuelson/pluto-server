import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				`.env/.env.${process.env.NODE_ENV}`,
				`.env/.env.${process.env.NODE_ENV}.local`,
			],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
