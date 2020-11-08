import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ModuleName, ModuleAction } from '@xapp/shared/enums';
import { User } from '@xapp/api/users';
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

		// const module = this.reflector.get<ModuleName>('module', context.getClass());
		const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
		const permissions = this.reflector.get<ModuleAction[]>('permissions', context.getHandler()) || [];

		const user: User = request.user || null;

		if (user && !roles.length && !permissions.length) {
			return true;
		}

		const hasRoutePermission = permissions
			? user instanceof User && user.checkPermissions(permissions)
			: null;

		const hasGroup = roles
			? roles.filter((roleName) => user instanceof User && user[roleName]).length > 0
			: null;

		return hasGroup === true || hasRoutePermission === true || (hasGroup === null && hasRoutePermission === null);
	}
}
