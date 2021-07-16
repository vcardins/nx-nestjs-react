import {
	HouseholdInput,
	HouseholdInvitationInput,
	HouseholdInvitationWelcome,
	HouseholdOutput,
	HouseholdMemberSignup,
	HouseholdRoomInput,
	HouseholdRoomOutput,
} from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class HouseholdStore extends DataContext<HouseholdOutput, HouseholdInput> {
	constructor(authHeader?: string) {
		super({ basePath: 'household', authHeader });
	}

	invite = (data: HouseholdInvitationInput) => this.create({ url: 'invite', data });

	getInvitation = (invitationCode: string) =>
		this.read<{ url: string }, HouseholdInvitationWelcome>({ url: `invitation/${invitationCode}` });

	signUpMember = (data: HouseholdMemberSignup) => {
		return this.create({ url: 'signup', data });
	};

	addRoom = (data: HouseholdRoomInput) => {
		return this.create<HouseholdRoomOutput>( { url: 'room', data } ) as unknown as Promise<HouseholdRoomOutput>;
	};

	removeRoom = (householdRoomId: number) => {
		return this.delete({ url: 'room' }, householdRoomId);
	};

	updateRoomName = (householdRoomId: number, customName: string) => {
		return this.update({ url: 'room', data: { customName } }, householdRoomId);
	};
}
