import { IAuthState, IApiCallState } from './';

export interface IStoreState<TStore = any> extends IApiCallState {
	store: TStore;
	init: (authProps: IAuthState) => void;
	reset?: () => void;
}
