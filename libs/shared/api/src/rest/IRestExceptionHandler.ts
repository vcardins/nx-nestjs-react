export interface IRestExceptionHandler {
	( error: Error, statusCode?: number ): Promise<unknown>;
}
