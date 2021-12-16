import { ApiCallStatus } from '..';

export interface IApiCallState {
	data?: any;
	status: ApiCallStatus;
	error?: null | Error;
}
