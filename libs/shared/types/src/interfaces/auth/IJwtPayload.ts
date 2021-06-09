export interface IJwtPayload {
	id: number;
	email: string;
	groups?: string[];
	role: string;
	isSuperuser: boolean;
	iat: number;
	exp: number;
}
