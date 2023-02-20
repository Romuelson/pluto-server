import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ColorModel } from './schemas/color.schema';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';

@Module({
	imports: [MongooseModule.forFeature([ColorModel])],
	providers: [ColorService],
	controllers: [ColorController],
	exports: [ColorService],
})
export class ColorModule {}
