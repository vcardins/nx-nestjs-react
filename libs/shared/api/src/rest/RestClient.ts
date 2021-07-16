import { ValidationError } from '@xapp/shared/exceptions';
import { appConfig } from '@xapp/shared/config';
import { KeyType } from '@xapp/shared/types';

import { RestMethod } from './RestMethod';
import { IRestClientPayload } from './IRestClientPayload';
import { IRestExceptionHandler } from './IRestExceptionHandler';

const errorMessages = {
	206: 'Partial Content',
	403: 'Access Forbidden',
	404: 'Resource Not Found',
	500: 'A server error has occurred',
};

interface IRestClientProps {
	authHeader?: string;
	basePath?: string;
	idProp?: string;
	onHandleException?: ( error: Error ) => Promise<void>;
	onHandleUnauthorizedAccess?: ( method: RestMethod, payload: IRestClientPayload ) => Promise<void>;
}

export class RestClient<TModel = any> {
	public jsonContentType = 'application/json';
	public authHeader = '';
	public basePath = '';
	public idProp = 'id';
	private onHandleUnauthorizedAccess: (method: RestMethod, payload: IRestClientPayload) => Promise<void>;
	private onHandleException: IRestExceptionHandler;

	constructor({
		authHeader = '',
		basePath = '',
		idProp = 'id',
		onHandleException,
		onHandleUnauthorizedAccess,
	}: IRestClientProps = {}) {
		this.authHeader = authHeader;
		this.basePath = basePath;
		this.idProp = idProp;
		this.onHandleException = onHandleException;
		this.onHandleUnauthorizedAccess = onHandleUnauthorizedAccess;
	}

	get<T>(payload: IRestClientPayload, id?: KeyType): Promise<T | TModel> {
		return this.request(RestMethod.Get, payload, id);
	}

	post<T>(payload: IRestClientPayload): Promise<T | TModel> {
		return this.request(RestMethod.Post, payload);
	}

	patch<T>(payload: IRestClientPayload, id: KeyType): Promise<T | TModel> {
		return this.request(RestMethod.Patch, payload, id);
	}

	put<T>(payload: IRestClientPayload, id: KeyType): Promise<T | TModel> {
		return this.request(RestMethod.Put, payload, id);
	}

	delete<T>(payload: IRestClientPayload, id: KeyType): Promise<T | TModel> {
		return this.request(RestMethod.Delete, payload, id);
	}

	upload<T>(payload: IRestClientPayload = null): Promise<T> {
		const formData = new FormData();
		formData.append('files', payload.data);

		return this.request(RestMethod.Post, { url: payload.url, data: formData });
	}

	private verifyPayload(payload: IRestClientPayload) {
		const { data, options } = payload || {};
		const headers = new Headers();
		let contentType = this.jsonContentType;
		let body = data;
		let url: string;

		if ((payload?.url?.toString() || '').indexOf('http') > -1) {
			url = payload.url;
		}
		else {
			url = payload?.url
				? `${this.basePath}/${payload.url}`
				: this.basePath;
		}

		if (!url) {
			throw new ValidationError('Rest API endpoint is missing');
		}

		const defaultOptions = Object.assign(
			{ contentType: null, noAuthToken: false, headers: undefined },
			options,
		);

		if (data) {
			if (typeof data === 'object') {
				if (data.constructor.name === 'FormData') {
					contentType = 'multipart/form-data';
				}
				else {
					body = JSON.stringify(data);
				}
			}
			else {
				contentType = 'application/x-www-form-urlencoded';
			}
		}

		if (defaultOptions.contentType) {
			contentType = defaultOptions.contentType;
		}

		if (!defaultOptions.headers && this.authHeader) {
			headers.set('Authorization', this.authHeader);
		}

		headers.set('Accept', contentType);
		headers.set('Content-Type', contentType);

		return { url, body, headers };
	}

	/**
	 * Make it public for custom error handler
	 * @param method Method
	 * @param payload Data
	 * @param errorHandler Error handler
	 */
	public async request<T>(
		method: RestMethod,
		payload: IRestClientPayload,
		id?: KeyType,
	): Promise<T> {
		const errorHandler = payload?.errorHandler
			? payload.errorHandler
			: this.onHandleException;

		const { url, body, headers } = this.verifyPayload(payload);
		let updatedUrl = this.buildUrl(url, payload?.data);

		if (id) {
			updatedUrl = `${updatedUrl}/${id}`;
		}

		const request: RequestInit = {
			method: method.toUpperCase(),
			headers,
			body,
		};

		// eslint-disable-next-line no-undef
		const promise = () => fetch(updatedUrl, request);

		const response = await promise();

		// window.location.href = `/error/${response.status}?url=${window.location.pathname}&msg=${response.statusText}`;
		// throw new ValidationError('Error on communicating to the server. Please, check if the device is connected to the internet or contact the server administrator.');
		const responseContentType = response.headers.get('content-type') || '';

		switch (response.status) {
			case 403:
			case 404:
			case 500:
			case 400:
				// eslint-disable-next-line no-case-declarations
				const error = await response.json();
				throw error; //new Error(error.message || errorMessages[response.status])
				// throw errorHandler?.(
				// 	new Error(error.message || errorMessages[response.status]),
				// 	response.status,
				// );
			case 401:
				// console.error('Access code has expired');
				throw this.onHandleUnauthorizedAccess?.(method, payload);
			case 200:
			case 201:
			case 204:
				return responseContentType.indexOf(this.jsonContentType) !== -1
					? await response.json() as unknown as T
					: await response.text() as unknown as T;
		}
	}

	getParams = (data: any = {}, parameters: { [key: string] : string } = {}): string =>
		Object.keys(data).reduce((queryString, prop: string) => {
			if ((Object.keys(parameters).length > 0 && parameters[prop])) {
				queryString.push(`${encodeURIComponent(prop)}=${encodeURIComponent(data[prop])}`);
			}
			return queryString;
		}, []).join('&')

	private buildUrl(resource: string, parameters: unknown): string {
		const endpoint = parameters
			? Object.keys(parameters).reduce((result, prop) => {
				const key = `:${prop}`;
				if (result.indexOf(key) > -1 && parameters[prop]) {
					// eslint-disable-next-line no-param-reassign
					result = result.replace(key, parameters[prop]);
					delete parameters[prop];
				}
				return result;
			}, resource)
			: resource;

		if (endpoint.indexOf('http') > -1) {
			return endpoint;
		}

		const apiEndPoint = endpoint.substr(0, 1) === '/'
			? endpoint.substr(1)
			: endpoint;

		return new URL(`${appConfig.apiMeta.url}/${apiEndPoint}`).href;
	}
}
