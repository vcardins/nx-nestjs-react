import { Float, Query, Resolver } from '@nestjs/graphql';
import { Public } from './public.decorator';

@Public()
@Resolver()
export class CoreResolver {
	@Query(() => Float)
	uptime() {
		return process.uptime();
	}
}
