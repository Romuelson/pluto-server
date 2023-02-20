import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { InstanceImageModel } from './schemas/instance-image.schema';
import { InstanceImageService } from './instance-image.service';
import { InstanceImageController } from './instance-image.controller';

import { FileModule } from '../file/file.module';

@Module({
	imports: [MongooseModule.forFeature([InstanceImageModel]), FileModule],
	providers: [InstanceImageService],
	controllers: [InstanceImageController],
	exports: [InstanceImageService],
})
export class InstanceImageModule {}
