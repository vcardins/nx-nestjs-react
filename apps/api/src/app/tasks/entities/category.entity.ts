import { Column, Entity, BaseEntity, OneToMany } from 'typeorm';

import { CategoryTask } from './category_task.entity';
import { HouseholdCategory } from '../../household/entities/household_category.entity';

@Entity('category')
export class Category extends BaseEntity {
	@Column('int', { primary: true, name: 'id', unique: true })
	id: number;

	@Column('datetime', { name: 'date_created' })
	dateCreated: Date;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description: string | null;

	@Column('varchar', { name: 'name', length: 255 })
	name: string;

	@OneToMany(() => HouseholdCategory, (householdCategory) => householdCategory.category)
	householdCategories: HouseholdCategory[];

	@OneToMany(
		() => CategoryTask,
		(categoryTask) => categoryTask.category,
	)
	taskCategory: CategoryTask[];
}
