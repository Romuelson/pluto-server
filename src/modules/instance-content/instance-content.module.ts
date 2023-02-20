import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstanceContentModel } from './schemas/instance-content.schema';
import { InstanceContentService } from './instance-content.service';
import { InstanceContentController } from './instance-content.controller';

@Module({
	imports: [MongooseModule.forFeatureAsync([InstanceContentModel])],
	providers: [InstanceContentService],
	controllers: [InstanceContentController],
	exports: [InstanceContentService],
})
export class InstanceContentModule {}
