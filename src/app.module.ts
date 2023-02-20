import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as cfg from './config/config';

import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

import { ProductModule } from './modules/product/product.module';
import { ProductViewModule } from './modules/product-view/product-view.module';
import { ProductContainerModule } from './modules/product-container/product-container.module';

import { InstanceModule } from './modules/instance/instance.module';
import { InstanceImageModule } from './modules/instance-image/instance-image.module';
import { InstanceContentModule } from './modules/instance-content/instance-content.module';
import { InstanceStoreModule } from './modules/instance-store/instance-store.module';

import { FileModule } from './modules/file/file.module';

import { ColorModule } from './modules/color/color.module';
import { SizeModule } from './modules/size/size.module';

import { ChapterModule } from './modules/chapter/chapter.module';
import { MaterialModule } from './modules/material/material.module';
import { BrandModule } from './modules/brand/brand.module';
import { LineModule } from './modules/line/line.module';
import { LabelModule } from './modules/label/label.module';

import { CategoryModule } from './modules/category/category.module';
import { CompoundModule } from './modules/compound/compound.module';
import { InstanceGroupModule } from './modules/instance-group/instance-group.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			expandVariables: true,
			envFilePath: [
				`.env/.env.${process.env.NODE_ENV}`,
				`.env/.env.${process.env.NODE_ENV}.local`,
			],
			load: [
				cfg.appPathConfig,
				cfg.appHttpCofnig,
				cfg.appPrefixCofnig,
				cfg.appDatabaseConfig,
				cfg.appValidateConfig,
			],
		}),

		MongooseModule.forRootAsync({
			inject: [ConfigService],
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('database.uri'),
			}),
		}),

		ProductModule,
		ProductViewModule,
		ProductContainerModule,

		InstanceModule,
		InstanceImageModule,
		InstanceContentModule,
		InstanceStoreModule,

		FileModule,

		ColorModule,
		SizeModule,

		ChapterModule,
		MaterialModule,
		BrandModule,
		LineModule,
		LabelModule,

		CategoryModule,
		CompoundModule,
		InstanceGroupModule,
	],
	providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
