import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { FileController } from './file.controller';

import { MulterConfigService } from 'src/config/multer-config.service';
import { ImageService } from './services/image.service';

@Module({
	imports: [MulterModule.registerAsync({ useClass: MulterConfigService })],
	providers: [FileService, ImageService],
	controllers: [FileController],
	exports: [FileService, ImageService],
})
export class FileModule {}
