export interface IJwtPayload {
	readonly id: number;
	readonly isActive: boolean;
	readonly isSuperuser: boolean;
	readonly groups: { name: string }[];
	readonly iat: number;
	readonly exp: number;
}
