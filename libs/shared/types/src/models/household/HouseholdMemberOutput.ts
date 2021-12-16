import { IUserAccount, IUserProfileInput } from '../../interfaces';
import { HouseholdMemberInput } from './HouseholdMemberInput';

export class HouseholdMemberOutput {
	id: HouseholdMemberInput['id'];
	isDefault: HouseholdMemberInput['isDefault'];
	type: HouseholdMemberInput['type'];
	userId: HouseholdMemberInput['userId'];
	user: Pick<IUserAccount, 'email' | 'lastLogin' | 'phoneNumber'> & {
		userProfile: IUserProfileInput;
	};
}
