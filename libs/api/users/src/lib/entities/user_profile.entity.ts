import { Column, Entity, BaseEntity, JoinColumn, OneToOne } from 'typeorm';
import { IsOptional, MaxLength } from 'class-validator';
import { User } from './user.entity';

@Entity('user_profile')
export class UserProfile extends BaseEntity {
	@Column({ primary: true, name: 'user_id', unique: true })
	userId: number;

	@Column({ name: 'picture_url', nullable: true, length: 255 })
	pictureUrl?: string | null;

	@Column({ nullable: true, length: 255 })
	bio?: string | null;

	@Column({ name: 'first_name', length: 30, nullable: true })
	@MaxLength(30)
	@IsOptional()
	firstName: string = undefined;

	@Column({ name: 'last_name', length: 30, nullable: true })
	@MaxLength(30)
	@IsOptional()
	lastName?: string = undefined;

	@Column({ name: 'date_of_birth', nullable: true })
	dateOfBirth?: string | null;

	@Column({ nullable: true, length: 3 })
	locale?: string | null;

	@OneToOne(() => User, (user) => user.userProfile)
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;
}
