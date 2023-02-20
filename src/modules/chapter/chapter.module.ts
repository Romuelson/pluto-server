import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterModel } from './schemas/chapter.schema';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';

@Module({
	imports: [MongooseModule.forFeatureAsync([ChapterModel])],
	providers: [ChapterService],
	controllers: [ChapterController],
	exports: [ChapterService],
})
export class ChapterModule {}
