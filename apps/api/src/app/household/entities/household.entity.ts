import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { HouseholdCategory } from './household_category.entity';
import { HouseholdMembers } from './household_members.entity';
import { HouseholdMemberInvitation } from './household_member_invitation.entity';

import { User } from '@xapp/api/users';
import { BaseEntity } from '@xapp/api/core';

@Entity('household')
export class Household extends BaseEntity {
	@Column('varchar', { name: 'name', length: 100 })
	name: string;

	@OneToMany(() => HouseholdCategory, ({ household }) => household)
	householdCategories: HouseholdCategory[];

	@OneToMany(
		() => HouseholdMembers,
		({ household }) => household,
	)
	householdMembers: HouseholdMembers[];

	@ManyToOne('User', 'household')
	@JoinColumn([{ name: 'main_user_id', referencedColumnName: 'id' }])
	mainUser: User;

	@OneToMany(
		() => HouseholdMemberInvitation,
		({ household }) => household,
	)
	householdInvitedMembers: HouseholdMemberInvitation[];

	@OneToMany('Notification', ({ notification }) => notification)
	notifications: Notification[];
}
