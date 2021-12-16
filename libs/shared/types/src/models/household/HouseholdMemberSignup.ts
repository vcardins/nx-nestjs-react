import { ISignUpInput } from './../../interfaces/auth/ISignUpInput';

export class HouseholdMemberSignup implements ISignUpInput {
	email: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
	invitationCode: string;
}
