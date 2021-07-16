import { ConflictException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectMapper } from 'nestjsx-automapper';
// import { Express } from 'express';
import * as argon2 from 'argon2';

import { IFindAndCountResult, IPaginationQuery, BaseService } from '@xapp/api/core';
import { getUtcDate } from '@xapp/shared/utils';
import { FilesService } from '@xapp/api/files';

import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
// import { UserDto } from '../dto/user.dto';

const userAuthRelations = ['roles', 'roles.permissions', 'userProfile'];

@Injectable()
export class UserService extends BaseService<User> {
	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
		@InjectMapper() autoMapper,
		private readonly filesService: FilesService,
	) {
		super(repository, autoMapper);
	}

	async assertEmail(email: string, id?: number) {
		if (email) {
			let userOfEmail: User;
			try {
				userOfEmail = await this.findByEmail(email);
			}
			catch (error) {
				userOfEmail = undefined;
			}
			if (userOfEmail?.id !== id) {
				throw new ConflictException({
					errors: {
						email: `User with email "${email}" already exists`,
					},
				});
			}
		}
	}

	async findById(id: number) {
		return super.findById(id, {
			relations: userAuthRelations,
		});
	}

	getSelect() {
		return this.queryBuilder
			.leftJoinAndSelect(`${this.modelName}.roles`, 'role')
			.leftJoinAndSelect(`${this.modelName}.userProfile`, 'userProfile')
			.leftJoinAndSelect('role.permissions', 'permission');
	}

	async findAndCount(options: IPaginationQuery & { role: string }): Promise<IFindAndCountResult<User> | User[]> {
		this.queryBuilder = this.createQueryBuilder();

		if (options.role) {
			this.queryBuilder = this.queryBuilder
				.leftJoinAndSelect(`${this.modelName}.roles`, 'role')
				.where('role.id = :role', { role: options.role });
		}
		else {
			this.queryBuilder = this.getSelect();
		}

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.id = :id`, {
				// like :q or ${this.tableName}.title like :q
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}

	async findByEmail(email: string): Promise<User> {
		return this.repository.findOne({
			where: { email },
			relations: userAuthRelations,
		});
	}

	async findByPhoneNumber(phoneNumber: string) {
		return this.repository.findOne(
			{ where: { phoneNumber } },
			// `User with phone number "${phoneNumber}" not found`,
		);
	}

	async findByVerificationKey(verificationKey: string) {
		return this.repository.findOne(
			{ where: { verificationKey } },
			// `User with phone number "${phoneNumber}" not found`,
		);
	}

	async findByPhoneVerificationCode(phoneVerificationCode: string) {
		return this.repository.findOne(
			{ where: { phoneVerificationCode } },
			// `User with phone number "${phoneNumber}" not found`,
		);
	}

	async create(user: User) {
		await this.assertEmail(user.email, user.id);
		return super.create(user);
	}

	async update(id: number, model: Partial<User>) {
		await this.assertEmail(model.email, model.id);
		return await super.update(
			id,
			{
				...model,
				lastUpdated: getUtcDate(),
			},
		);
	}

	async findBy(where: FindOneOptions<User>, errorMessage: string) {
		try {
			return await this.repository.findOneOrFail(where);
		}
		catch (error) {
			throw new NotFoundException(errorMessage);
		}
	}

	async addAvatar(userId: number, imageBuffer: any, filename: string) {
		const user = await this.findById(userId);
		if (user.avatar) {
			await this.repository.update(userId, {
				...user,
				avatar: null,
			});
			await this.filesService.deletePublicFile(user.avatar.id);
		}
		const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
		await this.repository.update(userId, {
			...user,
			avatar,
		});
		return avatar;
	}

	async deleteAvatar(userId: number) {
		const queryRunner = this.repository.manager.connection.createQueryRunner();
		const user = await this.findById(userId);
		const fileId = user.avatar?.id;

		if (fileId) {
			await queryRunner.connect();
			await queryRunner.startTransaction();
			try {
				await queryRunner.manager.update(User, userId, {
					...user,
					avatar: null,
				});
				await this.filesService.deletePublicFileWithQueryRunner(fileId, queryRunner);
				await queryRunner.commitTransaction();
			}
			catch (error) {
				await queryRunner.rollbackTransaction();
				throw new InternalServerErrorException();
			}
			finally {
				await queryRunner.release();
			}
		}
	}

	async setCurrentRefreshToken(refreshToken: string, userId: number) {
		const currentHashedRefreshToken = await argon2.hash(refreshToken);
		await this.repository.update(userId, {
			currentHashedRefreshToken,
		});
	}

	async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
		const user = await this.findById(userId);
		const isRefreshTokenMatching = await argon2.verify(user.currentHashedRefreshToken, refreshToken);

		if (isRefreshTokenMatching) {
			return user;
		}
	}

	async removeRefreshToken(userId: number) {
		return this.repository.update(userId, {
			currentHashedRefreshToken: null,
		});
	}

	getUserDto(user: User): UserDto {
		const { userProfile, roles = [], id, joinedAt, isActive, isSuperuser, lastLogin, email, phoneNumber } = user;

		return plainToClass(UserDto, {
			id, joinedAt, isActive, isSuperuser, lastLogin,
			email,
			roles: roles.map((role) => ({
				...role,
				// permissions: role.permissions.map(({ operation, module }) => ({
				// 	operation,
				// 	module,
				// })),
			})),
			profile: plainToClass(UserProfileDto, { ...userProfile, phoneNumber }),
		});
	}
}
