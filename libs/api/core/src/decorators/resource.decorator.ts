import { SetMetadata } from '@nestjs/common';
import { Resources } from '@xapp/shared/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ResourceGroup = (resource: Resources) => SetMetadata('resource', resource);
