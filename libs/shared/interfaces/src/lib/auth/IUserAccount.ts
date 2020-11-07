import { VerificationKeyPurpose } from '@xapp/shared/enums';

export interface IUserAccount {
	username: string;
	email: string;
	hashedPassword: string;
	isSuperuser: boolean;
	isActive: boolean;
	lastLogin: Date;
	isAccountVerified: boolean;
	verificationKey: string;
	dateVerificationKeySent: Date | null;
	verificationKeyPurpose: VerificationKeyPurpose;
	verificationStorage: string;
	createIp: string | null;
	dateAccountLocked: Date | null;
	dateAccountClosed: Date | null;
	dateJoined: Date;
	lastPasswordChanged: Date | null;
	requiresPasswordReset: boolean;
	lastFailedPasswordReset: Date | null;
	failedPasswordResetCount: number;
	lastUpdateIp: string | null;
	lastUpdated: Date | null;
}
