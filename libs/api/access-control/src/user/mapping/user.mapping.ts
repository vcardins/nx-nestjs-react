import { ProfileBase, Profile, AutoMapper } from 'nestjsx-automapper';

import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Profile()
export class UserProfile extends ProfileBase {
	constructor(private readonly mapper: AutoMapper) {
		super();
		mapper.createMap(User, UserDto);
	}

	configure(): void {
		return null;
	}
}
