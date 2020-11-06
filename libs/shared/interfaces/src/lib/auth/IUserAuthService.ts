import { IVerifyEmailInput } from './IVerifyEmailInput';
import { ISignInInput } from './ISignInInput';
import { ISignUpInput } from './ISignUpInput';
import { IUserProfile } from './IUserProfile';

export interface IAuthService {
	getAccessToken(): string;
	getAuthHeader(): string;
	getRole(): string;
	getUser(): IUserProfile;
	isAuthorized(allowedRoles: string[]): boolean;
	isUserSessionValid(accessToken: string): boolean;
	setSession(accessToken: string): void;
	setUser(user: any): void;
	signInWithEmailAndPassword(data: ISignInInput): Promise<any>;
	signInWithToken(): Promise<IUserProfile>;
	signOut(): Promise<any>;
	signUp(user?: ISignUpInput): Promise<any>;
	verifyAccount(data: IVerifyEmailInput): Promise<any>;
}
