import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Operations, Resources, UserRoles } from '@xapp/shared/types';
import { User } from '@xapp/api/access-control';
import { AUTH_GUARD_TYPE } from '../constants';

@Injectable()
export class AccessGuard extends AuthGuard(AUTH_GUARD_TYPE) {
	constructor(private readonly reflector: Reflector) {
		super();
	}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		try {
			// if either the class or the method is decorated with Public
			const isPublic = this.reflector.get<boolean>('isPublic', context.getClass())
				|| this.reflector.get<boolean>('isPublic', context.getHandler());

			if (isPublic) {
				return true;
			}

			await super.canActivate(context);
		}
		catch (error) {
			Logger.error('Error in canActivate', error.message, AccessGuard.name);
		}

		const resource = this.reflector.get<Resources>('resource', context.getClass());
		const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler()) || [];
		const operations = this.reflector.get<Operations[]>('permissions', context.getHandler()) || [];

		const user: User = request.user || null;

		if (user && !roles.length && !operations.length) {
			return true;
		}

		// TODO: Fix checkPermissions method
		const hasRoutePermission = operations
			? user instanceof User && user.checkPermissions(operations, resource)
			: null;

		const hasRole = roles
			? roles.some((role) => user instanceof User && user.roles.some(({ id }) => id === role))
			: null;

		return hasRole === true || hasRoutePermission === true || (hasRole === null && hasRoutePermission === null);
	}
}
