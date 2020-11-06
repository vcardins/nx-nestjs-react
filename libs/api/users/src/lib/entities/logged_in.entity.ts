import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { User } from './user.entity';

@Entity('logged_in')
export class LoggedIn extends BaseEntity {
	@Column({ name: 'date_created' })
	dateCreated: Date;

	@Column({ name: 'remote_ip_addr', nullable: true, length: 255 })
	remoteIpAddr: string | null;

	@ManyToOne(() => User, (user) => user.loggedIns)
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;
}
