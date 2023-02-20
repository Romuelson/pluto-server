import { Catch, ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		const status = exception.getStatus();
		const message = exception.message;

		response.status(status).json({
			message,
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
