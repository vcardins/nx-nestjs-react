import { IAuthState, IApiCallState } from './';

export interface IStoreState<TStore = any> extends IApiCallState {
	store: TStore | null;
	init: (authProps: IAuthState) => Promise<void>;
	reset?: () => void;
	clearError: () => void;
}
