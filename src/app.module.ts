import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './modules/product/product.module';
import { ConfigurationModule } from './config/configuration.module';

import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { CategoryModule } from './modules/category/category.module';

@Module({
	imports: [
		ConfigurationModule,
		MongooseModule.forRoot(process.env.MONGODB_URI || '', {
			connectionFactory: (connection) => {
				connection.plugin(require('mongoose-autopopulate'));
				return connection;
			},
		}),
		ProductModule,
		CategoryModule,
	],
	providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
