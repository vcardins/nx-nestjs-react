import { BaseEntity } from '@xapp/api/core';
import { Column, Entity, OneToMany } from 'typeorm';
import { HouseholdCategory } from '../../household/entities/household_category.entity';
import { CategoryTask } from './category_task.entity';

@Entity('category')
export class Category extends BaseEntity {
	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description: string | null;

	@Column('varchar', { name: 'name', length: 255 })
	name: string;

	@OneToMany(() => HouseholdCategory, (householdCategory) => householdCategory.category)
	householdCategories: HouseholdCategory[];

	@OneToMany(() => CategoryTask, (categoryTask) => categoryTask.category)
	categoryTasks: CategoryTask[];
}
