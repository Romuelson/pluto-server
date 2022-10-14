import { registerAs } from '@nestjs/config';

export const configDatabase = registerAs('database', () => ({
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT || '1488', 10),
}));
