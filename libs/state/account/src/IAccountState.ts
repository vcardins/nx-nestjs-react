import { IAuthState, IStoreState } from '@xapp/state/shared';
import { AccountStore } from '.';
import {
	IUserProfileInput,
	ISignedUserOutput,
	IVerifyEmailInput,
	IVerifyPhoneNumberInput,
	ISignInInput,
	IChangePhoneNumberInput,
	IChangePasswordInput,
	IResetPasswordInput,
	IForgotPasswordInput,
	ISignUpInput,
} from '@xapp/shared/auth';
import { IActionResponse } from '@xapp/shared';
import { IEndpointsConfig } from '@xapp/shared/config';

export interface IAccountStateValues {
	userInfo?: ISignedUserOutput;
	response?: IActionResponse;
}

export interface IAccountState extends IAccountStateValues, Omit<IStoreState<AccountStore>, 'init'> {
	init: (props: IAuthState, endpoints: IEndpointsConfig) => void;

	signUp(data: ISignUpInput): Promise<void>;
	verifyEmail(data: IVerifyEmailInput): Promise<void>;
	verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<void>;
	forgotPassword(data: IForgotPasswordInput): Promise<void>;
	updateProfile(data: IUserProfileInput): Promise<void>;
	getUserProfile(): Promise<ISignedUserOutput>;
	closeAccount(): Promise<void>;
	reopenAccount(data: ISignInInput): Promise<void>;
	changePhoneNumber(data: IChangePhoneNumberInput): Promise<void>;
	changePassword(data: IChangePasswordInput): Promise<void>;
	resetPassword(data: IResetPasswordInput): Promise<void>;
}
