import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LineModel } from './schemas/line.schema';
import { LineService } from './line.service';
import { LineController } from './line.controller';

@Module({
	imports: [MongooseModule.forFeature([LineModel])],
	providers: [LineService],
	controllers: [LineController],
	exports: [LineService],
})
export class LineModule {}
