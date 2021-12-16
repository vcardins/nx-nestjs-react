export interface IJwtPayload {
	id: number;
	email: string;
	roles?: string[];
	role: string;
	isSuperuser: boolean;
	iat: number;
	exp: number;
}
