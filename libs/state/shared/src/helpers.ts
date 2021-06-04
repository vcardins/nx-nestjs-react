import { ApiCallStatus, IApiCallState } from '.';

export const getSuccess = <T = any>(props: T & { items: T[] }): T & IApiCallState => ({
	status: ApiCallStatus.Success,
	error: null,
	...props
})

export const getFailed = <T = any>(error: IApiCallState['error'], rest: T): T & IApiCallState => ({
	status: ApiCallStatus.Error,
	error,
	...rest,
})

export const getLoading = () => ({ status: ApiCallStatus.Loading });
