import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '@xapp/api/access-control';
import { BaseEntity } from '@xapp/api/core';

import { HouseholdRoom } from './household_room.entity';
import { HouseholdMembers } from './household_members.entity';
import { HouseholdMemberInvitation } from './household_member_invitation.entity';

@Entity('household')
export class Household extends BaseEntity {
	@Column('varchar', { name: 'name', length: 100 })
	name: string;

	@OneToMany(() => HouseholdRoom, ({ household }) => household)
	rooms: HouseholdRoom[];

	@OneToMany(
		() => HouseholdMembers,
		({ household }) => household,
	)
	members: HouseholdMembers[];

	@ManyToOne('User', 'household')
	@JoinColumn([{ name: 'main_user_id', referencedColumnName: 'id' }])
	mainUser: User;

	@OneToMany(
		() => HouseholdMemberInvitation,
		({ household }) => household,
	)
	invitedMembers: HouseholdMemberInvitation[];

	// @OneToMany('Notification', ({ notification }) => notification)
	// notifications: Notification[];
}
