import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, QueryRunner } from 'typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { v4 as uuid } from 'uuid';

import { BaseService } from '@xapp/api/core';
// import { S3 } from 'aws-sdk';
import { PublicFile } from './public-file.entity';

// TODO: Temporary solution, create and interface for a FileStorage and select an approp
class S3 {
	async upload({Key}: {Bucket?: string, Body?: any, Key: string}): Promise<{Key: string, Location: string}> {
		return new Promise((resolve) => resolve({Key, Location: 'location'}));
	}

	async deleteObject({Key}: {Bucket: string, Key: string}) {
		return new Promise((resolve) => resolve({Key, Location: 'location'}));
	}
}

@Injectable()
export class FilesService extends BaseService<PublicFile> {
	private bucketName: string;

	constructor(
		@InjectRepository(PublicFile) protected readonly repository: Repository<PublicFile>,
		@InjectMapper() autoMapper,
		private readonly configService: ConfigService,
	) {
		super(repository, autoMapper);
		this.bucketName = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
	}
	async uploadPublicFile(dataBuffer: any, filename: string) {
		const s3 = new S3();
		const uploadResult = await s3
			.upload({
				Bucket: this.bucketName,
				Body: dataBuffer,
				Key: `${uuid()}-${filename}`,
			});
			// .promise();

		const newFile = this.repository.create({
			key: uploadResult.Key,
			url: uploadResult.Location,
		});
		await this.repository.save(newFile);
		return newFile;
	}

	async deletePublicFile(fileId: number) {
		const file = await this.repository.findOne({ id: fileId });
		const s3 = new S3();
		await s3
			.deleteObject({
				Bucket: this.bucketName,
				Key: file.key,
			});
			// .promise();
		await this.repository.delete(fileId);
	}

	async deletePublicFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
		const file = await queryRunner.manager.findOne(PublicFile, { id: fileId });
		const s3 = new S3();
		await s3
			.deleteObject({
				Bucket: this.bucketName,
				Key: file.key,
			});
			// .promise();
		await queryRunner.manager.delete(PublicFile, fileId);
	}
}
