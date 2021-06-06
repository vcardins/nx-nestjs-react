import { CleanLayout } from './Clean';
import { HolyGrailLayout } from './HolyGrail';
import { AuthLayout } from './Auth';
import { LayoutStyles } from '@xapp/shared/types';

const Layouts = {
	[LayoutStyles.Auth]: AuthLayout,
	[LayoutStyles.Clean]: CleanLayout,
	[LayoutStyles.Viewport]: HolyGrailLayout,
};

export { Layouts };
