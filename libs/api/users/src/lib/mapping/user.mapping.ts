import { ProfileBase, Profile, AutoMapper } from 'nestjsx-automapper';

import { User, UserDto } from '@xapp/api/users';

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
