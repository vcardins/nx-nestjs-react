import { APP_FILTER } from '@nestjs/core';
import { JwtExceptionFilter } from '../filters/jwt-exception.filter';

export const AUTH_APP_FILTERS = [
	{ provide: APP_FILTER, useClass: JwtExceptionFilter, multi: true },
];
