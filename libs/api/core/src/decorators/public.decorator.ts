import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Public = (isPublic = true) => SetMetadata('isPublic', isPublic);
