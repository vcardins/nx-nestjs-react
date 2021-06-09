import { SetState } from 'zustand';
import { ApiCallStatus, IApiCallState } from '.';


export const setLoading = <TState extends IApiCallState>(set: SetState<TState>) => () => {
	set({
		status: ApiCallStatus.Loading,
	});
};

export const setError = <TState extends IApiCallState, TValues = Partial<TState>>(set: SetState<TState>) =>
	(error: Error, props?: TValues) => {
		set({
			status: ApiCallStatus.Error,
			error,
			...props,
		});
	};

export const setIdle = <TState extends IApiCallState, TValues = Partial<TState>>(set: SetState<TState>) =>
	(props?: TValues) => {
		set({
			status: ApiCallStatus.Idle,
			error: null,
			...props,
		});
	};

export const setSuccess = <TState extends IApiCallState, TValues = Partial<TState>>(set: SetState<TState>) =>
	(props?: TValues) => {
		set({
			status: ApiCallStatus.Success,
			error: null,
			...props,
		});
	};

export const setReset = <TState extends IApiCallState>(set: SetState<TState>) =>
	() => {
		set({ });
	};
