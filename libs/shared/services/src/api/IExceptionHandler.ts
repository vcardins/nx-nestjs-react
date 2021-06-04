/**
 * Custom exception handle interface
 * Before only support global error handler, difficult to track
 */

export interface IExceptionHandler {
	( error: Error, statusCode?: number ): Promise<any>;
}
