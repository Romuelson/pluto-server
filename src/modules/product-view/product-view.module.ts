import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductViewModel } from './schemas/product-view.schema';
import { ProductViewService } from './product-view.service';
import { ProductViewController } from './product-view.controller';

@Module({
	imports: [MongooseModule.forFeatureAsync([ProductViewModel])],
	providers: [ProductViewService],
	controllers: [ProductViewController],
	exports: [ProductViewService],
})
export class ProductViewModule {}
