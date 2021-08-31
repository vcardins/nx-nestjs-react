import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './access.guard';
// import { JwtRefreshGuard } from './jwt-refresh.guard.ts';

export const AUTH_APP_GUARDS = [
	{ provide: APP_GUARD, useClass: AccessGuard, multi: true },
];
