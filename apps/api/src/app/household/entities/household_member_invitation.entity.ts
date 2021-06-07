import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
import { User } from '@xapp/api/users';
import { Household } from './household.entity';

@Entity('household_member_invitation')
export class HouseholdMemberInvitation extends BaseEntity {
	@Column('varchar', { name: 'email', length: 255, unique: true })
	email: string;

	@Column('varchar', { name: 'full_name', nullable: true, length: 100 })
	fullName: string | null;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('datetime', { name: 'date_accepted', nullable: true })
	dateAccepted: Date | null;

	@ManyToOne(() => Household, (household) => household.householdInvitedMembers)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@ManyToOne('User', 'householdMemberInvitations')
	@JoinColumn([{ name: 'sender_user_id', referencedColumnName: 'id' }])
	senderUser: User;
}
