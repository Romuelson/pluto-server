import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LabelModel } from './schemas/label.schema';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';

@Module({
	imports: [MongooseModule.forFeature([LabelModel])],
	providers: [LabelService],
	controllers: [LabelController],
	exports: [LabelService],
})
export class LabelModule {}
