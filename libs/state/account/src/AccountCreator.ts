import { StateCreator, UseStore } from 'zustand';

import { IAuthState, ApiCallStatus, createStore } from '@xapp/state/shared';

import { AccountStore } from './AccountStore';
import { IAccountState } from './IAccountState';
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

export const createAccount: StateCreator<IAccountState> = (set, get, api) => ({
	store: null,
	status: ApiCallStatus.Idle,
	userInfo: null,
	error: null,
	orderBy: { id: 'asc' },
	init: (props: IAuthState, endpoints: IEndpointsConfig) => {
		set({ store: new AccountStore(props.authHeader, endpoints) });
	},
	signUp(data: ISignUpInput): Promise<IUserProfile> {
		console.log(data);
		return null;
	},
	verifyEmail(data: IVerifyEmailInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	verifyPhoneNumber(data: IVerifyPhoneNumberInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	forgotPassword(data: IForgotPasswordInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	async updateProfile(data: IUserProfileInput): Promise<void> {
		const { status, store, userInfo } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const profile = await store.updateProfile(data);

			set({
				status: ApiCallStatus.Success,
				userInfo: { ...userInfo, profile },
				error: null,
			});
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				error,
			});
		}
	},
	async getUserProfile(): Promise<ISignedUserOutput> {
		const { status, store } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const userInfo = await store.getUserProfile();

			set({
				status: ApiCallStatus.Success,
				userInfo,
				error: null,
			});

			return userInfo;
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				userInfo: null,
				error,
			});
		}
	},
	closeAccount(): Promise<IActionResponse> {
		return null;
	},
	reopenAccount(data: ISignInInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	changePhoneNumber(data: IChangePhoneNumberInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	changePassword(data: IChangePasswordInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	resetPassword(data: IResetPasswordInput): Promise<IActionResponse> {
		console.log(data);
		return null;
	},
	// async read(filters?: IAccountState['filters']) {
	// 	const { status, store } = get();

	// 	if (status === ApiCallStatus.Loading) {
	// 		return;
	// 	}

	// 	set({ status: ApiCallStatus.Loading });

	// 	try {
	// 		const items = await store.readAll(filters);

	// 		set({
	// 			status: ApiCallStatus.Success,
	// 			items,
	// 			error: null,
	// 		});
	// 	} catch (error) {
	// 		set({
	// 			status: ApiCallStatus.Error,
	// 			items: [],
	// 			error,
	// 		});
	// 	}
	// },
	// async save(data: AccountInput, id?: number) {
	// 	const { store, status, items } = get();

	// 	if (status === ApiCallStatus.Loading) {
	// 		return;
	// 	}

	// 	set({ status: ApiCallStatus.Loading });

	// 	try {
	// 		const isNew = !id;
	// 		const item = isNew
	// 			? await store.create({ data })
	// 			: await store.update({ data: { id, ...data } });

	// 		const index = items.findIndex(({ id }) => id === item.id);

	// 		set((state) => void (
	// 			index === -1 ? (state.items = [item, ...items]) : (state.items[index] = item),
	// 			(state.status = ApiCallStatus.Success),
	// 			(state.error = null)
	// 		));
	// 	} catch (error) {
	// 		set({
	// 			status: ApiCallStatus.Error,
	// 			error,
	// 		});
	// 	}
	// },
	// async remove(id: number) {
	// 	const { store, status, items } = get();

	// 	if (status === ApiCallStatus.Loading) {
	// 		return;
	// 	}

	// 	set({ status: ApiCallStatus.Loading });

	// 	try {
	// 		await store.delete(id);

	// 		set({
	// 			status: ApiCallStatus.Success,
	// 			items: items.filter((item) => item.id !== id),
	// 			error: null,
	// 		});
	// 	} catch (error) {
	// 		set({
	// 			status: ApiCallStatus.Error,
	// 			error,
	// 		});
	// 	}
	// },
	// async setComplete(todo: AccountOutput) {
	// 	const { store, status, items } = get();

	// 	if (status === ApiCallStatus.Loading) {
	// 		return;
	// 	}

	// 	set({ status: ApiCallStatus.Loading });

	// 	try {
	// 		const response = await store.complete(todo.id, !!todo.dateCompleted);
	// 		const index = items.findIndex(({ id }) => id === response.id);

	// 		set((state) => void (
	// 			(state.items[index] = response),
	// 			(state.status = ApiCallStatus.Success),
	// 			(state.error = null)
	// 		));
	// 	} catch (error) {
	// 		set({
	// 			status: ApiCallStatus.Error,
	// 			error,
	// 		});
	// 	}
	// },
	// reset() {
	// 	set({
	// 		status: ApiCallStatus.Idle,
	// 		items: [],
	// 		error: null,
	// 	});
	// },
});

export const useAccountState: UseStore<ReturnType<typeof createAccount>> =
	createStore<IAccountState>((set, get, api) => createAccount(set, get, api))
