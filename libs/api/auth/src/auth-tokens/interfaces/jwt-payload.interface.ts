export interface IJwtPayload {
	readonly id: number;
	readonly isActive: boolean;
	readonly isSuperuser: boolean;
	readonly roles: { name: string }[];
	readonly iat: number;
	readonly exp: number;
}
