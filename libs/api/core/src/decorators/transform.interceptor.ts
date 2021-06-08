import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface Response<T> {
	data: T;
}

interface ClassType<T> {
	new (): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T> | T> {
	constructor(
		private readonly classType: ClassType<T>,
		private readonly envelope = false,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | T> {
		return next
			.handle()
			.pipe(
				map((data) =>
					this.envelope
						? { data: plainToClass(this.classType, data) }
						: plainToClass(this.classType, data),
				),
			);
	}
}
