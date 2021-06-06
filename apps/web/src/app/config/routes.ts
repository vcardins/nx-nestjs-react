import { generateRoutes } from '@xapp/shared/utils';
import { AuthGroups } from '@xapp/shared/types';

import { pagesConfigs } from '../pages/@config';

export const routes = generateRoutes(pagesConfigs, AuthGroups.user);
