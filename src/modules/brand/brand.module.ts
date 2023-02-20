import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandModel } from './schemas/brand.schema';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';

@Module({
	imports: [MongooseModule.forFeature([BrandModel])],
	providers: [BrandService],
	controllers: [BrandController],
	exports: [BrandService],
})
export class BrandModule {}
