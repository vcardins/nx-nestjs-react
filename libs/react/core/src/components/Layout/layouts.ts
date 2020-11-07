import { CleanLayout } from './Clean';
import { HolyGrailLayout } from './HolyGrail';
import { AuthLayout } from './Auth';
import { LayoutStyles }  from '../../enums/LayoutStyles';

const Layouts = {
	[LayoutStyles.Auth]: AuthLayout,
	[LayoutStyles.Clean]: CleanLayout,
	[LayoutStyles.Viewport]: HolyGrailLayout,
};

export { Layouts };
