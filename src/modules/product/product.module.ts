import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { ProductModel } from './schemas/product.schema';

@Module({
	imports: [MongooseModule.forFeature([ProductModel])],
	providers: [ProductService],
	controllers: [ProductController],
})
export class ProductModule {}
