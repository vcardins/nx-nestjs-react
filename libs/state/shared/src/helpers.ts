import { SetState } from 'zustand';
import { ApiCallStatus, IApiCallState } from '.';

export const setLoading = <TState extends IApiCallState>(set: SetState<TState>) => () => {
	set({
		status: ApiCallStatus.Loading,
	});
}

export const setError = <TState extends IApiCallState>(set: SetState<TState>) => (error: Error) => {
	set({
		status: ApiCallStatus.Error,
		error,
	});
}

export const setSuccess = <TState extends IApiCallState, TValues = any>(set: SetState<TState>) => (props: TValues) => {
	set({
		status: ApiCallStatus.Success,
		error: null,
		...props
	});
}
