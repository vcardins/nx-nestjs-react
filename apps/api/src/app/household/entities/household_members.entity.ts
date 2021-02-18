import {
	Column,
	Entity,
	BaseEntity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { User } from '@xapp/api/users';

import { Household } from './household.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('household_member')
export class HouseholdMembers extends BaseEntity {
	@Column('int', { primary: true, name: 'user_id', unique: true })
	userId: number;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('boolean', { name: 'is_default', nullable: true })
	isDefault: boolean | null;

	@Column('boolean', { name: 'is_owner' })
	isOwner: boolean;

	@Column('varchar', { name: 'description', nullable: true, length: 40 })
	description: string | null;

	@OneToOne('User', 'householdMembers')
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;

	@ManyToOne(() => Household, (household) => household.householdMembers)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@OneToMany(() => Task, (task) => task.executorUser)
	executedTasks: Task[];

	@OneToMany(() => Task, (task) => task.assignedUser)
	assignedTasks: Task[];
}
