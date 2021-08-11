import { Column, Entity, OneToMany, BaseEntity } from 'typeorm';

import { TaskTemplateTranslation } from './task_template_translation.entity';

@Entity('language')
export class Language extends BaseEntity {
	@Column('varchar', { length: 8, primary: true, unique: true })
	code: string;

	@Column('varchar', { length: 60 })
	name: string;

	@Column('varchar', { length: 12, nullable: true })
	charset: string;

	@OneToMany(
		() => TaskTemplateTranslation,
		({ language }) => language,
	)
	taskTemplatesTranslations!: TaskTemplateTranslation[];
}
