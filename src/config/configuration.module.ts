import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from './configuration';
import { ConfigurationService } from './configuration.service';

@Module({
	imports: [ConfigModule.forRoot(configOptions())],
	providers: [ConfigurationService],
})
export class ConfigurationModule {}
