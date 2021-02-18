import { Column, Entity, BaseEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Household } from './household.entity';
import { Category } from '../../tasks/entities/category.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('household_category')
export class HouseholdCategory extends BaseEntity {
	@Column('int', { primary: true, name: 'household_id' })
	householdId: number;

	@Column('int', { primary: true, name: 'category_id' })
	categoryId: number;

	@Column('varchar', { name: 'custom_name', nullable: true, length: 60 })
	customName: string | null;

	@ManyToOne(() => Category, (category) => category.householdCategories)
	@JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
	category: Category;

	@ManyToOne(() => Household, (household) => household.householdCategories)
	@JoinColumn([{ name: 'household_id', referencedColumnName: 'id' }])
	household: Household;

	@OneToMany(() => Task, (task) => task.householdCategory)
	tasks: Task[];
}
