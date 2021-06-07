import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Frequency } from './frequency.entity';
import { TaskTemplate } from './task_template.entity';
import { Category } from './category.entity';
import { BaseEntity } from '@xapp/api/core';

@Entity('category_task')
export class CategoryTask extends BaseEntity {
	@Column('int', { primary: true, name: 'category_id' })
	categoryId: number;

	@Column('int', { primary: true, name: 'task_id' })
	taskId: number;

	@Column('int', { name: 'relevance', nullable: true })
	relevance: number | null;

	@ManyToOne(() => Frequency, (frequency) => frequency.categoryTasks)
	@JoinColumn([{ name: 'frequency_id', referencedColumnName: 'id' }])
	frequency: Frequency;

	@ManyToOne(
		() => TaskTemplate,
		(taskTemplate) => taskTemplate.categoryTasks,
	)
	@JoinColumn([{ name: 'task_template_id', referencedColumnName: 'id' }])
	taskTemplate: TaskTemplate;

	@ManyToOne(() => Category, (category) => category.categoryTasks)
	@JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
	category: Category;
}
