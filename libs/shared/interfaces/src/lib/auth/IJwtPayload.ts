export interface IJwtPayload {
	[x: string]: any;
	id: number;
	email: string;
	groups?: string[];
	role: string;
	isSuperuser: boolean;
	iat: number;
	exp: number;
}