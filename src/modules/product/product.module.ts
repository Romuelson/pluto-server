import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { MulterConfigService } from 'src/config/multer-config.service';

import { ProductModel } from './schemas/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { ProductContainerModule } from '../product-container/product-container.module';
import { ProductViewModule } from '../product-view/product-view.module';

import { InstanceModule } from './../instance/instance.module';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([ProductModel]),
		MulterModule.registerAsync({ useClass: MulterConfigService }),

		ProductViewModule,
		ProductContainerModule,

		InstanceModule,
	],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [ProductService],
})
export class ProductModule {}
