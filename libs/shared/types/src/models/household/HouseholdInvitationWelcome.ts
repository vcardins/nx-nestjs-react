export class HouseholdInvitationWelcome {
	inviter: {
		firstName: string;
		lastName: string;
		pictureUrl: string;
	};
	household: string;
	dateCreated: string;
	dateAccepted: string | null;
	invitee: {
		firstName: string;
		email: string;
	}
}
