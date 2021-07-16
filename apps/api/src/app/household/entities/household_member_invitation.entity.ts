import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@xapp/api/core';
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

	@CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
	createdAt: Date;

	@Column({ type: 'datetime', name: 'accepted_at', nullable: true })
	acceptedAt: Date | null;

	@ManyToOne(
		() => Household,
		({ invitedMembers }) => invitedMembers,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@ManyToOne(
		() => User,
		'householdMemberInvitations',
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'sender_user_id', referencedColumnName: 'id' }])
	senderUser: User;

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}
}
