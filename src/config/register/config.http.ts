import { registerAs } from '@nestjs/config';

export const configHttp = registerAs('http', () => ({
	port: parseInt(process.env.PORT || '80', 10),
}));
