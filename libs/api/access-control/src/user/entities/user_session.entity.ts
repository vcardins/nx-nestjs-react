import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { User } from './user.entity';

@Entity('user_session')
export class UserSession extends BaseEntity {
	@CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
	createdAt: Date;

	@Column({ name: 'remote_ip_addr', nullable: true, length: 255 })
	remoteIpAddr: string | null;

	@ManyToOne(() => User, ({ sessions }) => sessions, { onDelete: 'CASCADE' })
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;
}
