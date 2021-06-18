import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, getUtcDate } from '@xapp/api/core';
import { User } from '@xapp/api/access-control';
import { Household } from './household.entity';

@Entity('household_member_invitation')
export class HouseholdMemberInvitation extends BaseEntity {
	@Column('varchar', { name: 'email', length: 255, unique: true })
	email: string;

	@Column('varchar', { name: 'first_name', nullable: true, length: 40 })
	firstName: string | null;

	@Column('varchar', { name: 'invitation_code', nullable: false, length: 40 })
	invitationCode: string | null;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('datetime', { name: 'date_accepted', nullable: true })
	dateAccepted: Date | null;

	@ManyToOne(() => Household, (household) => household.invitedMembers)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@ManyToOne(() => User, 'householdMemberInvitations')
	@JoinColumn([{ name: 'sender_user_id', referencedColumnName: 'id' }])
	senderUser: User;

	@BeforeInsert()
	doBeforeInsertion() {
		this.dateCreated = getUtcDate();
		this.validate();
	}
}
