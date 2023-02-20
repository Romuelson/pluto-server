import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MaterialModel } from './schemas/material.schema';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';

@Module({
	imports: [MongooseModule.forFeature([MaterialModel])],
	providers: [MaterialService],
	controllers: [MaterialController],
	exports: [MaterialService],
})
export class MaterialModule {}
