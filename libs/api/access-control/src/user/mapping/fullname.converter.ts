import { Converter } from '@nartc/automapper';
import { UserProfile } from '../user_profile.entity';

export class FullNameConverter implements Converter<UserProfile, string> {
	convert(source: UserProfile): string {
		return `${source.firstName} ${source.lastName}`;
	}
}
