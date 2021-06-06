import { SetMetadata } from '@nestjs/common';
import { ModuleAction } from '@xapp/shared/types';

export const Permissions = (...permissions: ModuleAction[]) => SetMetadata('permissions', permissions);
