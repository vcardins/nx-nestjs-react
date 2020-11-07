import { SetMetadata } from '@nestjs/common';
import { ModuleAction } from '@xapp/shared/enums';

export const Permissions = (...permissions: ModuleAction[]) => SetMetadata('permissions', permissions);
