import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstanceStoreModel } from './schemas/instance-store.schema';
import { InstanceStoreService } from './instance-store.service';
import { InstanceStoreController } from './instance-store.controller';

@Module({
	imports: [MongooseModule.forFeature([InstanceStoreModel])],
	providers: [InstanceStoreService],
	controllers: [InstanceStoreController],
	exports: [InstanceStoreService],
})
export class InstanceStoreModule {}
