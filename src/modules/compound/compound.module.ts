import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompoundModel } from './schemas/compound.schema';
import { CompoundService } from './compound.service';
import { CompoundController } from './compound.controller';

@Module({
	imports: [MongooseModule.forFeature([CompoundModel])],
	controllers: [CompoundController],
	providers: [CompoundService],
	exports: [CompoundService],
})
export class CompoundModule {}
