import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { IAuthState, ApiCallStatus, createStore, setError, setLoading, setSuccess, IStoreState } from '@xapp/state/shared';
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
	IActionResponse,
	IEndpointsConfig,
} from '@xapp/shared/types';
import { AccountStore } from './AccountStore';

interface IAccountStateValues {
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

const init = (set: SetState<IAccountState>) => (props: IAuthState, endpoints: IEndpointsConfig) => {
	set({
		store: new AccountStore(props.authHeader, endpoints),
	});
};

const getUserProfile = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (): Promise<ISignedUserOutput> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const userInfo = await store.getUserProfile();

		setSuccess(set)({ userInfo });

		return userInfo;
	}
	catch (error) {
		setError(set)(error);
	}
};

const signUp = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: ISignUpInput): Promise<void> => {
	const { status, store, userInfo } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const profile = await store.signUp(data);

		setSuccess(set)({ userInfo: { ...userInfo, profile } });
	}
	catch (error) {
		setError(set)(error);
	}
};

const verifyEmail = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IVerifyEmailInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.verifyEmail(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const verifyPhoneNumber = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IVerifyPhoneNumberInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.verifyPhoneNumber(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const forgotPassword = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IForgotPasswordInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.forgotPassword(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const updateProfile = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IUserProfileInput): Promise<void> => {
	const { status, store, userInfo } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const profile = await store.updateProfile(data);

		set({
			status: ApiCallStatus.Success,
			userInfo: { ...userInfo, profile },
			error: null,
		});
	}
	catch (error) {
		setError(set)(error);
	}
};

const closeAccount = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.closeAccount();

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const reopenAccount = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: ISignInInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.reopenAccount(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const changePhoneNumber = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IChangePhoneNumberInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.changePhoneNumber(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const changePassword = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IChangePasswordInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.changePassword(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

const resetPassword = (set: SetState<IAccountState>, get: GetState<IAccountState>) => async (data: IResetPasswordInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const response = await store.resetPassword(data);

		setSuccess(set)({ response });
	}
	catch (error) {
		setError(set)(error);
	}
};

export const createAccount: StateCreator<IAccountState> = (set, get) => ({
	store: null,
	status: ApiCallStatus.Idle,
	userInfo: null,
	error: null,
	orderBy: { id: 'asc' },
	init: init(set),
	signUp: signUp(set, get),
	verifyEmail: verifyEmail(set, get),
	verifyPhoneNumber: verifyPhoneNumber(set, get),
	forgotPassword: forgotPassword(set, get),
	updateProfile: updateProfile(set, get),
	getUserProfile: getUserProfile(set, get),
	closeAccount: closeAccount(set, get),
	reopenAccount: reopenAccount(set, get),
	changePhoneNumber: changePhoneNumber(set, get),
	changePassword: changePassword(set, get),
	resetPassword: resetPassword(set, get),
});

export const useAccountState: UseStore<ReturnType<typeof createAccount>> =
	createStore<IAccountState>((set, get, api) => createAccount(set, get, api));
