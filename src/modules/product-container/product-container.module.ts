import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductContainerModel } from './schemas/product-container.schema';
import { ProductContainerService } from './product-container.service';
import { ProductContainerController } from './product-container.controller';

import { InstanceContentModule } from '../instance-content/instance-content.module';

@Module({
	imports: [MongooseModule.forFeatureAsync([ProductContainerModel]), InstanceContentModule],
	providers: [ProductContainerService],
	controllers: [ProductContainerController],
	exports: [ProductContainerService],
})
export class ProductContainerModule {}
