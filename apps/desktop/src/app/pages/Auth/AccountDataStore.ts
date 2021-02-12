import { DataContext } from '@xapp/react/core';
import { IUserProfileInput, ISignedUserOutput, IUserProfile, IActionResponse, IVerifyEmailInput, IVerifyPhoneNumberInput, ISignInInput, IChangePhoneNumberInput, IChangePasswordInput, IResetPasswordInput, IForgotPasswordInput, IEndpointsConfig } from '@xapp/shared/interfaces';

export class AccountStore extends DataContext {
	constructor(authHeader: string, private endpoints: IEndpointsConfig) {
		super({
			basePath: 'account',
			authHeader,
		});
	}

	async updateProfile(data: IUserProfileInput): Promise<IUserProfile> {
		return this.patch<IUserProfile>({url: this.endpoints.profile, data});
	}

	async getUserProfile(): Promise<ISignedUserOutput> {
		return this.read<ISignedUserOutput>({url: this.endpoints.profile});
	}

	async verifyEmail(data: IVerifyEmailInput): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.verifyEmail, data});
	}

	async verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.verifyPhoneNumber, data});
	}

	async closeAccount(): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.closeAccount});
	}

	async reopenAccount(data: ISignInInput): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.reopenAccount, data});
	}

	async changePhoneNumber(data: IChangePhoneNumberInput): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.changePhoneNumber, data});
	}

	async changePassword(data: IChangePasswordInput): Promise<IActionResponse> {
		return this.patch({url: this.endpoints.changePassword, data});
	}

	async resetPassword(data: IResetPasswordInput): Promise<IActionResponse> {
		return this.update({ url: this.endpoints.resetPassword, data});
	}

	async forgotPassword(data: IForgotPasswordInput): Promise<IActionResponse> {
		return await this.update({ url: this.endpoints.forgotPassword, data});
	}
}
