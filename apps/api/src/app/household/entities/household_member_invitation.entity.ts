import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Household } from './household.entity';
import { User } from '@xapp/api/users';
import { BaseEntity } from '@xapp/api/core';

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

	@ManyToOne('User', 'householdInvitedMembers')
	@JoinColumn([{ name: 'sender_user_id', referencedColumnName: 'id' }])
	senderUser: User;

	@ManyToOne(() => Household, (household) => household.householdMembers)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;
}
