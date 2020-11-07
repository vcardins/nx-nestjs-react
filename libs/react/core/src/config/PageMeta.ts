import { IPageMeta } from '../interfaces/IPageMeta';
import { PageKey } from './PageKey';

export const PageMeta: {[key: string]: IPageMeta } = {
	[PageKey.SignIn]: {
		key: PageKey.SignIn,
		title: 'Sign In',
		description: 'Sign In',
	},
	[PageKey.SignUp]: {
		key: PageKey.SignUp,
		title: 'Sign Up',
		description: 'Sign Up',
	},
	[PageKey.ResetPassword]: {
		key: PageKey.ResetPassword,
		title: 'Reset Password',
		description: 'Reset Password',
	},
	[PageKey.ChangePassword]: {
		key: PageKey.ChangePassword,
		title: 'Change Password',
		description: 'Change Password',
	},
	[PageKey.UserProfile]: {
		key: PageKey.UserProfile,
		title: 'User Profile',
		description: 'User Profile',
	},
	[PageKey.UserSettings]: {
		key: PageKey.UserSettings,
		title: 'User Settings',
		description: 'User Settings',
	},
	[PageKey.Dashboard]: {
		key: PageKey.Dashboard,
		title: 'Dashboard',
		description: 'Dashboard',
	},
	[PageKey.Admin]: {
		key: PageKey.Admin,
		title: 'Admin',
		description: 'Admin',
	},
	[PageKey.Home]: {
		key: PageKey.Home,
		title: 'Home',
		description: 'Home',
	},
	[PageKey.PageNotFound]: {
		key: PageKey.PageNotFound,
		title: 'Not Found',
		description: 'Not Found',
	},
	[PageKey.Error404]: {
		key: PageKey.Error404,
		title: 'Error 404',
		description: 'Error 404',
	},
	[PageKey.Error500]: {
		key: PageKey.Error500,
		title: 'Error 500',
		description: 'Error 500',
	},
};
