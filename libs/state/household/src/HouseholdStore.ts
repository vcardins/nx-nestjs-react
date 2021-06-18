import { HouseholdInput, HouseholdInvitationInput, HouseholdInvitationWelcome, HouseholdOutput , HouseholdMemberSignup } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class HouseholdStore extends DataContext<HouseholdOutput, HouseholdInput> {
	constructor(authHeader?: string) {
		super({ basePath: 'household', authHeader });
	}

	invite = (data: HouseholdInvitationInput) =>
		this.create({ url: 'invite', data });

	getInvitation = (invitationCode: string) =>
		this.read<{ url: string; }, HouseholdInvitationWelcome>({ url: `invitation/${invitationCode}` });

	signUpMember = (data: HouseholdMemberSignup) => {
		return this.create({ url: 'signup', data });
	}
}
