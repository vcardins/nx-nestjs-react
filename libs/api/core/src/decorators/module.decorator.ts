import { SetMetadata } from '@nestjs/common';
import { ModuleName } from '@xapp/shared/enums';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ModuleGroup = (module: ModuleName) => SetMetadata('module', module);
