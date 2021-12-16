import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { BaseService, IPaginationQuery, IFindAndCountResult } from '@xapp/api/core';

import { OauthTokensAccessToken } from './oauth-tokens-access-token.entity';

@Injectable()
export class OauthTokensAccessTokenService extends BaseService<OauthTokensAccessToken> {
	constructor(
		@InjectRepository(OauthTokensAccessToken)
		protected readonly repository: Repository<OauthTokensAccessToken>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findByProviderClientId(providerClientId: number) {
		const oauthTokensAccessToken = await this.repository.findOneOrFail({
			where: {
				providerClientId,
			},
		});
		return { oauthTokensAccessToken };
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<OauthTokensAccessToken> | OauthTokensAccessToken[]> {
		this.queryBuilder = this.createQueryBuilder();
		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.name like :q or ${this.modelName}.title like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}
}
