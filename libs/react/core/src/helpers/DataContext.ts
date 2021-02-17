/* eslint-disable immutable/no-mutation */
import { RestClient, RestMethod, IRestClientPayload } from '@xapp/shared/services';
import { INotifier, Notifier } from '../components/Notifier';

// const sanitizeId = (id: string) => (!id ? id : id.replace(/-/g, ''));

export interface IDataContext<TOutput = any, TInputCreate = any, TInputUpdate = TInputCreate> {
	readAll(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput[]>;
	read(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput>;
	create(payload: IRestClientPayload<TInputCreate>): Promise<TOutput>;
	patch(payload: IRestClientPayload<TInputUpdate>): Promise<TOutput>;
	update(payload: IRestClientPayload<TInputUpdate>): Promise<TOutput>;
	delete(id: string |  number): Promise<TOutput>;
	upload(payload: IRestClientPayload<TInputCreate>): Promise<TOutput>;
}

export interface IDataContextProps {
	basePath?: string;
	authHeader?: string;
	refreshToken?: string;
	handleUpdateAccessToken?: (accessToken: string) => void;
}

export class DataContext<TOutput = any, TInputCreate = any, TInputUpdate = TInputCreate> implements IDataContext<TOutput, TInputCreate, TInputUpdate> {
	public readonly api: RestClient;
	public readonly notifier: INotifier;
	private basePath: string;
	private accessToken: string;
	private refreshToken: string;

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

	readAll = async <T>(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput[]> =>
		this.api.get<T | TInputCreate>(payload);

	read = async <T>(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput> =>
		this.api.get<T | TInputCreate>(payload);

	create = async <T>(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput> =>
		this.api.post<T | TInputCreate>(payload);

	patch = async <T>(payload?: IRestClientPayload<TInputUpdate>): Promise<TOutput> =>
		this.api.patch<T | TInputUpdate>(payload);

	update = async <T>(payload?: IRestClientPayload<TInputUpdate>): Promise<TOutput> =>
		this.api.put<T | TInputUpdate>(payload);

	delete = async (id: string | number): Promise<TOutput> =>
		this.api.delete({ data: id });

	upload = async (payload?: IRestClientPayload<TInputCreate>): Promise<TOutput> =>
		this.api.upload(payload);

	setBaseEndpoint(basePath: string) {
		this.basePath = basePath;
	}

	private async handleExceptionDisplay(
		error?: Error,
		statusCode?: number,
	): Promise<void> {
		this.notifier.reportError(error?.message || 'Could not complete action');
		console.error(error, statusCode);
	}

	private async handleUnauthorizedAccess(
		method: RestMethod,
		payload: IRestClientPayload<TInputCreate>,
	): Promise<void> {
		this.notifier.reportError('Access Forbidden');
		if (!this.refreshToken) {
			return;
		}
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
