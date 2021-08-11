import { Column, Entity, OneToMany, JoinColumn, ManyToOne, BeforeInsert, CreateDateColumn } from 'typeorm';

import { User } from '@xapp/api/access-control';
import { BaseEntity } from '@xapp/api/core';

import { HouseholdRoom } from './household_room.entity';
import { HouseholdMember } from './household_member.entity';
import { HouseholdMemberInvitation } from './household_member_invitation.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('household')
export class Household extends BaseEntity {
	@Column('varchar', { name: 'name', length: 100 })
	name: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Column('varchar', { name: 'description', length: 255, nullable: true })
	description?: string | null;

	@OneToMany(
		() => Task,
		({ household }) => household,
		{ eager: true, onDelete: 'CASCADE' },
	)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	tasks: Task[];

	@OneToMany(
		() => HouseholdRoom,
		({ household }) => household,
		{ eager: true, onDelete: 'CASCADE' },
	)
	rooms: HouseholdRoom[];

	@OneToMany(
		() => HouseholdMember,
		({ household }) => household,
		{ eager: true, onDelete: 'CASCADE' },
	)
	@JoinColumn()
	members: HouseholdMember[];

	@ManyToOne(() => User, 'household', { nullable: false })
	@JoinColumn([{ name: 'owner_user_id', referencedColumnName: 'id' }])
	ownerUser: User;

	@OneToMany(
		() => HouseholdMemberInvitation,
		({ household }) => household,
		{ eager: true, onDelete: 'CASCADE' },
	)
	@JoinColumn()
	invitedMembers: HouseholdMemberInvitation[];

	@BeforeInsert()
	doBeforeInsertion() {
		this.validate();
	}

	// @OneToMany('Notification', ({ notification }) => notification)
	// notifications: Notification[];
}
