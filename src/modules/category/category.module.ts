import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel } from './schemas/category.schema';

@Module({
	imports: [MongooseModule.forFeature([CategoryModel])],
	providers: [CategoryService],
	controllers: [CategoryController],
})
export class CategoryModule {}
