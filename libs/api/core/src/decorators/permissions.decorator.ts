import { SetMetadata } from '@nestjs/common';
import { Operations } from '@xapp/shared/types';

export const Permissions = (...permissions: Operations[]) => SetMetadata('permissions', permissions);
