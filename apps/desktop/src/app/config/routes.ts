import { generateRoutes } from '@xapp/react/core';
import { AuthGroups } from '@xapp/shared/enums';

import { pagesConfigs } from '../pages/@config';

export const routes = generateRoutes(pagesConfigs, AuthGroups.user);
