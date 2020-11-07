/* eslint-disable immutable/no-mutation */
import { RestClient, RestMethod, IRestClientPayload } from '@xapp/shared/services';
import { INotifier } from '../components/Notifier/INotifier';
import { Notifier } from '../components/Notifier/Notifier';

// const sanitizeId = (id: string) => (!id ? id : id.replace(/-/g, ''));

export interface IDataContext<TOutput = any, TInput = any> {
	readAll(payload?: IRestClientPayload<TInput>): Promise<TOutput[]>;
	read(payload?: IRestClientPayload<TInput>): Promise<TOutput>;
	create(payload: IRestClientPayload<TInput>): Promise<TOutput>;
	patch(payload: IRestClientPayload<TInput>): Promise<TOutput>;
	update(payload: IRestClientPayload<TInput>): Promise<TOutput>;
	delete(id: string |  number): Promise<TOutput>;
	upload(payload: IRestClientPayload<TInput>): Promise<TOutput>;
}

export interface IDataContextProps {
	basePath?: string;
	authHeader?: string;
	refreshToken?: string;
	handleUpdateAccessToken?: (accessToken: string) => void;
}

export class DataContext<TOutput = any, TInput = any> implements IDataContext<TOutput, TInput> {
	public readonly notifier: INotifier;
	private basePath: string;
	private accessToken: string;
	private refreshToken: string;
	public api: RestClient;

	private onUpdateAccessToken: (accessToken: string) => void;

	constructor(props?: IDataContextProps) {
		const {basePath, authHeader, refreshToken, handleUpdateAccessToken} = props ?? ({} as IDataContextProps);

		this.notifier = new Notifier();
		this.basePath = basePath;
		this.refreshToken = refreshToken;
		this.onUpdateAccessToken = handleUpdateAccessToken;

		this.api = new RestClient<TOutput>({
			basePath,
			authHeader,
			onHandleException: this.handleExceptionDisplay.bind(this),
			onHandleUnauthorizedAccess: this.handleUnauthorizedAccess.bind(this),
		});
	}

	readAll = async (payload?: IRestClientPayload<TInput>): Promise<TOutput[]> =>
		this.api.get<TInput>(payload);

	read = async (payload?: IRestClientPayload<TInput>): Promise<TOutput> =>
		this.api.get<TInput>(payload);

	create = async (payload?: IRestClientPayload<TInput>): Promise<TOutput> =>
		this.api.post<TInput>(payload);

	patch = async (payload?: IRestClientPayload<TInput>): Promise<TOutput> =>
		this.api.patch<TInput>(payload);

	update = async (payload?: IRestClientPayload<TInput>): Promise<TOutput> =>
		this.api.put<TInput>(payload);

	delete = async (id: string | number): Promise<TOutput> =>
		this.api.delete({ data: id });

	upload = async (payload?: IRestClientPayload<TInput>): Promise<TOutput> =>
		this.api.upload(payload);

	setBaseEndpoint(basePath: string) {
		this.basePath = basePath;
	}

	private async handleExceptionDisplay(
		error?: Error,
		statusCode?: number,
	): Promise<any> {
		this.notifier.reportError(error?.message || 'Could not complete action');
		console.error(error, statusCode);
	}

	private async handleUnauthorizedAccess(
		method: RestMethod,
		payload: IRestClientPayload<TInput>,
	): Promise<any> {
		this.notifier.reportError('Access Forbidden');
		// if (!this.refreshToken) {
		// 	return;
		// }
		// const oldAccessToken = this.accessToken;
		// const newAccessToken = await this.fetchAccessToken(
		// 	this.refreshToken,
		// 	true,
		// );
		// const updatedPayload = {
		// 	...payload,
		// 	url: payload.url.replace(oldAccessToken, newAccessToken),
		// };

		// this.accessToken = newAccessToken;
		// this.onUpdateAccessToken(newAccessToken);

		// // Recall the action the previous actions
		// return await this.api[method]<any>(updatedPayload);
	}
}
