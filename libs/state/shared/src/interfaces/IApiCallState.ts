import { ApiCallStatus } from '..';

export interface IApiCallState {
	status: ApiCallStatus;
	error?: null | Error;
}
