import { LookupOutput } from './lookup.output';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LookupService {
	async getAll(): Promise<LookupOutput> {
		return new Promise((resolve) => {
			const response = new LookupOutput({ dateFormats: ['YYY-MM-DD'] });
			resolve(response);
		});
	}
}
