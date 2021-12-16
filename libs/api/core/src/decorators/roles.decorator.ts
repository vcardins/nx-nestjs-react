import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@xapp/shared/types';

export const Roles = (roles: UserRoles[]) => SetMetadata('roles', roles);
