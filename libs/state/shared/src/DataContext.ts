import { RestClient, RestMethod, IRestClientPayload } from '@xapp/shared/api';

export interface IDataContextProps {
	basePath?: string;
	authHeader?: string;
	refreshToken?: string;
	hydrateAccessToken?: (accessToken: string) => void;
}

export class DataContext<TOutput = any, TInputCreate = any, TInputUpdate = TInputCreate & { id: number }, TFilter = any> {
	public readonly api: RestClient;
	private basePath: string;
	private accessToken: string;
	private refreshToken: string;

	private onUpdateAccessToken: (accessToken: string) => void;

	constructor(props?: IDataContextProps) {
		const { basePath, authHeader, refreshToken, hydrateAccessToken: handleUpdateAccessToken } = props ?? ({} as IDataContextProps);

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

	readAll = <T = TFilter>(payload?: T): Promise<TOutput[]> =>
		this.api.get<T>(payload);

	read = <T = TFilter, TOut = TOutput>(payload?: T): Promise<TOut> =>
		this.api.get<T>(payload);

	create = <T = TInputCreate>(payload?: IRestClientPayload<TInputCreate>): Promise<TOutput> =>
		this.api.post<T | TInputCreate>(payload);

	patch = <T = TInputUpdate>(payload?: IRestClientPayload<TInputUpdate>): Promise<TOutput> =>
		this.api.patch<T | TInputUpdate>(payload);

	update = <T = TInputUpdate>(payload?: IRestClientPayload<TInputUpdate>): Promise<TOutput> =>
		this.api.put<T | TInputUpdate>(payload);

	delete = (id: string | number): Promise<TOutput> =>
		this.api.delete({ data: id });

	upload = (payload?: IRestClientPayload<TInputCreate>): Promise<TOutput> =>
		this.api.upload(payload);

	setBaseEndpoint(basePath: string) {
		this.basePath = basePath;
	}

	private async handleExceptionDisplay(
		error?: Error,
		statusCode?: number,
	): Promise<void> {
		// this.notifier.reportError(error?.message || 'Could not complete action');
		console.error(error, statusCode);
	}

	private handleUnauthorizedAccess(
		method: RestMethod,
		payload: IRestClientPayload<TInputCreate>,
	): Promise<void> {
		// this.notifier.reportError('Access Forbidden');
		if (!this.refreshToken) {
			return;
		}
		throw new Error(`${method} ${payload} Not implemented`);
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
