import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { ApiCallStatus, createStore, setError, setLoading, setSuccess, IStoreState } from '@xapp/state/shared';
import { ISignedUserOutput, ISignInInput } from '@xapp/shared/types';

import { AuthStore } from './AuthStore';

interface IAuthStoreStateValues {
	accessToken: string | null;
	user: ISignedUserOutput | null;
	authHeader: string;
	message?: string;
	isLoading: () => boolean;
}

export interface IAuthStoreState extends IAuthStoreStateValues, Omit<IStoreState<AuthStore>, 'init'> {

	getProviderUri: (providerKey: string) => Promise<{ redirect_uri: string }>;
	getOauthAccessToken?: (providerKey: string, code: string) => Promise<{token: string}>;
	onSignIn: (props: ISignInInput) => Promise<void>;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
	isSessionValid: () => boolean;
}

const getProviderUri = (set: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => async (providerKey: string): ReturnType<IAuthStoreState['getProviderUri']> => {
	const { store } = get();

	try {
		const redirect_uri = await store.getProviderUri(providerKey);
		return { redirect_uri };
	}
	catch (error) {
		setError(set)(error);
	}
};

const getOauthAccessToken = (set: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => async (providerKey: string, code: string): ReturnType<IAuthStoreState['getOauthAccessToken']> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	setLoading(set)();

	try {
		const token = await store.getOauthAccessToken(providerKey, code);

		setSuccess(set)();

		return { token };
	}
	catch (error) {
		setError(set)(error);
	}
};

const handleSignIn = (set: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => async (model: ISignInInput): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	try {
		setLoading(set)();
		const { user, access_token: accessToken } = await store.signInWithEmailAndPassword(model);
		const authHeader = store.getAuthHeader();

		setSuccess(set)({ user, accessToken, authHeader, message: '' });
	}
	catch (error) {
		setError(set)(error);
	}
};

const handleSignOut = (set: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => async (isTriggeredByExpiredSession?: boolean): Promise<void> => {
	const { status, store } = get();

	if (status === ApiCallStatus.Loading) {
		return;
	}

	if (isTriggeredByExpiredSession === true) {
		return console.info('Session has expired');
	}

	const { message } = await store.signOut();

	setSuccess(set)({
		user: null,
		accessToken: null,
		authHeader: null,
		message,
	});
};

const isSessionValid = (_: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => (): boolean => {
	const { store } = get();

	return store.isUserSessionValid();
};

const isLoading = (_: SetState<IAuthStoreState>, get: GetState<IAuthStoreState>) => () =>
	get().status === ApiCallStatus.Loading;

const store = new AuthStore();

export const createAuth: StateCreator<IAuthStoreState> = (set, get) => ({
	store,
	status: ApiCallStatus.Idle,
	authHeader: store.getAuthHeader(),
	accessToken: store.getAccessToken(),
	user: store.getUser(),
	getProviderUri: getProviderUri(set, get),
	getOauthAccessToken: getOauthAccessToken(set, get),
	onSignIn: handleSignIn(set, get),
	onSignOut: handleSignOut(set, get),
	isSessionValid: isSessionValid(set,get),
	isLoading: isLoading(set, get),
	clearError() {
		set({ error: null });
	},
});

export const useAuthState: UseStore<ReturnType<typeof createAuth>> =
	createStore<IAuthStoreState>((set, get, api) => createAuth(set, get, api));
