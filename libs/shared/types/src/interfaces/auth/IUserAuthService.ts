import { IVerifyEmailInput } from './IVerifyEmailInput';
import { ISignInInput } from './ISignInInput';
import { ISignUpInput } from './ISignUpInput';
import { IUserProfile } from './IUserProfile';

export interface IAuthService {
	getAccessToken(): string;
	getAuthHeader(): string;
	getRole(): string;
	getUser(): IUserProfile;
	isAuthorized(allowedUserRoles: string[]): boolean;
	isUserSessionValid(accessToken: string): boolean;
	setSession(accessToken: string): void;
	setUser(user: unknown): void;
	signInWithEmailAndPassword(data: ISignInInput): Promise<unknown>;
	signInWithToken(): Promise<IUserProfile>;
	signOut(): Promise<unknown>;
	signUp(user?: ISignUpInput): Promise<unknown>;
	verifyAccount(data: IVerifyEmailInput): Promise<unknown>;
}
