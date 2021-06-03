import { DataContext } from '@xapp/react/core';
import {
	IUserProfileInput,
	ISignedUserOutput,
	IUserProfile,
	IActionResponse,
	IVerifyEmailInput,
	IVerifyPhoneNumberInput,
	ISignInInput,
	IChangePhoneNumberInput,
	IChangePasswordInput,
	IResetPasswordInput,
	IForgotPasswordInput,
	IEndpointsConfig,
	ISignUpInput,
} from '@xapp/shared/interfaces';

const options = { noAuthToken: true };

export class AccountStore extends DataContext {
	constructor(authHeader: string, private endpoints: IEndpointsConfig) {
		super({
			basePath: 'account',
			authHeader,
		});
	}

	// BEGIN: Unauthenticated user's methods
	async signUp(data: ISignUpInput): Promise<IUserProfile> {
		return await this.create<{message: string; data: any}>({ url: this.endpoints.signUp, data, options });
	}

	async verifyEmail(data: IVerifyEmailInput): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.verifyEmail, data, options });
	}

	async verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.verifyPhoneNumber, data, options });
	}

	async forgotPassword(data: IForgotPasswordInput): Promise<IActionResponse> {
		return await this.update({ url: this.endpoints.forgotPassword, data, options });
	}

	// END: Unauthenticated user's methods

	// Authenticated user's methods
	async updateProfile(data: IUserProfileInput): Promise<IUserProfile> {
		return this.patch<IUserProfile>({ url: this.endpoints.updateProfile, data });
	}

	async getUserProfile(): Promise<ISignedUserOutput> {
		return this.read({ url: this.endpoints.profile });
	}

	async closeAccount(): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.closeAccount });
	}

	async reopenAccount(data: ISignInInput): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.reopenAccount, data });
	}

	async changePhoneNumber(data: IChangePhoneNumberInput): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.changePhoneNumber, data });
	}

	async changePassword(data: IChangePasswordInput): Promise<IActionResponse> {
		return this.patch({ url: this.endpoints.changePassword, data });
	}

	async resetPassword(data: IResetPasswordInput): Promise<IActionResponse> {
		return this.update({ url: this.endpoints.resetPassword, data });
	}
}
