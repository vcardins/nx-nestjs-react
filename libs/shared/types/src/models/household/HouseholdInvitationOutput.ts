export class HouseholdInvitationOutput {
	verificationCode: string;
	firstName: string;
	message: string;


	constructor(verificationCode: string, firstName: string, message: string) {
		this.verificationCode = verificationCode;
		this.firstName = firstName;
		this.message = message;
	}
}
