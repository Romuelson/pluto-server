import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SizeModel } from './schemas/size.schema';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';

@Module({
	imports: [MongooseModule.forFeature([SizeModel])],
	providers: [SizeService],
	controllers: [SizeController],
	exports: [SizeService],
})
export class SizeModule {}
