export class HouseholdInvitationWelcome {
	inviter: {
		firstName: string;
		lastName: string;
		pictureUrl: string;
	};
	household: string;
	createdAt: string;
	acceptedAt: string | null;
	invitee: {
		firstName: string;
		email: string;
	}
}
