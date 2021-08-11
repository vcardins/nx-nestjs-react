import { JoinColumn } from 'typeorm';
// import { BaseEntity } from '@xapp/api/core';
import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

import { TaskTemplate } from './../../tasks/entities/task_template.entity';
import { Language } from './language.entity';

@Entity('task_template_translation')
export class TaskTemplateTranslation extends BaseEntity {
	@Column('varchar', { length: 8, primary: true })
	code!: string;

	@Column('int', { name: 'task_template_id', primary: true })
	taskTemplateId!: number;

	@Column('varchar', { length: 120 })
	name: string;

	@Column('text', { nullable: true })
	description?: string | null;

	@JoinColumn({ name: 'task_template_id' })
	@ManyToOne(() => TaskTemplate, ({ translations }) => translations)
	taskTemplate!: TaskTemplate;

	@JoinColumn({ name: 'code' })
	@ManyToOne(() => Language, ({ taskTemplatesTranslations }) => taskTemplatesTranslations)
	language!: Language;
}
