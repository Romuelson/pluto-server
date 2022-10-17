import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
	IHttpConfig,
	IMongodbConfig,
	IConfiguration,
} from './interfaces/configuration.interface';

@Injectable()
export class ConfigurationService {
	constructor(private configService: ConfigService<IConfiguration>) {}

	httpConfig() {
		const http = this.configService.get<IHttpConfig>('http');

		return {
			port: parseInt(http?.port || '80', 10),
			host: http?.host || 'localhost',
		};
	}

	databaseConfig() {
		const database = this.configService.get<IMongodbConfig>('database');

		return {
			uri: database?.uri || 'localhost',
			host: database?.host || 'localhost',
			port: parseInt(database?.port || '1488', 10),
		};
	}
}
