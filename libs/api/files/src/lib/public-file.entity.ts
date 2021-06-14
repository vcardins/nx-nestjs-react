import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@xapp/api/core';

@Entity({ name: 'public_file' })
export class PublicFile  extends BaseEntity {
	@Column()
	public url: string;

	@Column()
	public key: string;
}
