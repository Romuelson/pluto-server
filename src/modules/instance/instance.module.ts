import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstanceModel } from './schemas/instance.schema';
import { InstanceService } from './instance.service';
import { InstanceController } from './instance.controller';

import { InstanceImageModule } from '../instance-image/instance-image.module';
import { InstanceContentModule } from '../instance-content/instance-content.module';
import { InstanceStoreModule } from '../instance-store/instance-store.module';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([InstanceModel]),

		InstanceImageModule,
		InstanceContentModule,
		InstanceStoreModule,
	],
	providers: [InstanceService],
	controllers: [InstanceController],
	exports: [InstanceService],
})
export class InstanceModule {}
