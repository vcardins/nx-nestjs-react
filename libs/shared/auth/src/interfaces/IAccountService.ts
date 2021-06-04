import { IActionResponse } from '@xapp/shared';

import {
	IVerifyEmailInput,
	IVerifyPhoneNumberInput,
	ISignInInput,
	IUserProfileInput,
	IUserProfile,
	ISignUpInput,
	IChangePhoneNumberInput,
	IChangePasswordInput,
	IResetPasswordInput,
	IForgotPasswordInput,
} from './';

export interface IAccountService {
	updateProfile(data: IUserProfileInput): Promise<IUserProfile>;
	signUp(data: ISignUpInput): Promise<IActionResponse>;
	getUserProfile(): Promise<IUserProfile>;
	verifyEmail(data: IVerifyEmailInput): Promise<IActionResponse>;
	verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<IActionResponse>;
	closeAccount(): Promise<IActionResponse>;
	reopenAccount(data: ISignInInput): Promise<IActionResponse>;
	changePhoneNumber(data: IChangePhoneNumberInput): Promise<IActionResponse>;
	changePassword(data: IChangePasswordInput): Promise<IActionResponse>;
	resetPassword(data: IResetPasswordInput): Promise<IActionResponse>;
	forgotPassword(data: IForgotPasswordInput): Promise<IActionResponse>;
}
