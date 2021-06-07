import { HouseholdInput, HouseholdMemberInput, HouseholdOutput } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class HouseholdStore extends DataContext<HouseholdOutput, HouseholdInput> {
	constructor(authHeader?: string) {
		super({
			basePath: 'household',
			authHeader,
		});
	}

	addMember = (data: HouseholdMemberInput) =>
		this.create({ url: 'member', data });
}
