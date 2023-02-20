import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { InstanceGroupModel } from './schemas/instance-group.schema';
import { InstanceGroupService } from './instance-group.service';
import { InstanceGroupController } from './instance-group.controller';

@Module({
	imports: [MongooseModule.forFeatureAsync([InstanceGroupModel])],
	providers: [InstanceGroupService],
	controllers: [InstanceGroupController],
	exports: [InstanceGroupService],
})
export class InstanceGroupModule {}
