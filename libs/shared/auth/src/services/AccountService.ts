import {
	IUserProfile,
	IUserProfileInput,
	ISignInInput,
	ISignUpInput,
	IResetPasswordInput,
	IForgotPasswordInput,
	IChangePhoneNumberInput,
	IChangePasswordInput,
	IVerifyEmailInput,
	IVerifyPhoneNumberInput,
	IAccountService,
} from '../interfaces';
import { appConfig } from '@xapp/shared/config';
import { RestClient } from '@xapp/shared/services';
import { IActionResponse } from '@xapp/shared';

const { endpoints, routes } = appConfig;
const api = new RestClient();

export const AccountService: IAccountService = {
	async updateProfile(data: IUserProfileInput): Promise<IUserProfile> {
		return api.patch<IUserProfile>({ url: endpoints.updateProfile, data });
	},

	async signUp(data: ISignUpInput): Promise<IActionResponse> {
		const response = await api.post<{message: string; data: any}>({ url: endpoints.signUp, data });

		return {
			redirect: routes.signIn,
			...response,
		} as IActionResponse;
	},

	async getUserProfile(): Promise<IUserProfile> {
		return api.get<IUserProfile>({ url: endpoints.profile });
	},

	async verifyEmail(data: IVerifyEmailInput): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.verifyEmail, data });
	},

	async verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.verifyPhoneNumber, data });
	},

	async closeAccount(): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.closeAccount });
	},

	async reopenAccount(data: ISignInInput): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.reopenAccount, data });
	},

	async changePhoneNumber(data: IChangePhoneNumberInput): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.changePhoneNumber, data });
	},

	async changePassword(data: IChangePasswordInput): Promise<IActionResponse> {
		return api.patch<any>({ url: endpoints.changePassword, data });
	},

	async resetPassword(data: IResetPasswordInput): Promise<IActionResponse> {
		return api.post<any>({ url: endpoints.resetPassword, data });
	},

	async forgotPassword(data: IForgotPasswordInput): Promise<IActionResponse> {
		return await api.post<any>({ url: endpoints.forgotPassword, data });
	},
};
