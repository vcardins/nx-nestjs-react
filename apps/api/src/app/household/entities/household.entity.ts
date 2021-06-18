import { Column, Entity, OneToMany, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';

import { User } from '@xapp/api/access-control';
import { BaseEntity, getUtcDate } from '@xapp/api/core';

import { HouseholdRoom } from './household_room.entity';
import { HouseholdMember } from './household_member.entity';
import { HouseholdMemberInvitation } from './household_member_invitation.entity';

@Entity('household')
export class Household extends BaseEntity {
	@Column('varchar', { name: 'name', length: 100 })
	name: string;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description?: string | null;

	@OneToMany(
		() => HouseholdRoom,
		({ household }) => household,
		{ cascade: true,  onDelete: 'CASCADE' },
	)
	rooms: HouseholdRoom[];

	@OneToMany(
		() => HouseholdMember,
		({ household }) => household,
		{ cascade: true,  onDelete: 'CASCADE' },
	)
	members: HouseholdMember[];

	@ManyToOne(() => User, 'household', { nullable: false })
	@JoinColumn([{ name: 'owner_user_id', referencedColumnName: 'id' }])
	ownerUser: User;

	@OneToMany(
		() => HouseholdMemberInvitation,
		({ household }) => household,
		{ cascade: true,  onDelete: 'CASCADE' },
	)
	invitedMembers: HouseholdMemberInvitation[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.dateCreated = getUtcDate();
	}

	// @OneToMany('Notification', ({ notification }) => notification)
	// notifications: Notification[];
}
