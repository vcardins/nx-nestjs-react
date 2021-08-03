import { VerificationKeyPurpose } from '../../enums';

export interface IUserAccount {
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
	joinedAt: Date;
	lastPasswordChanged: Date | null;
	requiresPasswordReset: boolean;
	lastFailedPasswordReset: Date | null;
	failedPasswordResetCount: number;
	lastUpdateIp: string | null;
	lastUpdated: Date | null;
}
