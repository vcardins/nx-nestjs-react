export class HouseholdMemberInput {
	id: number;
	userId: number;
	type: number;
	name: string;
	isDefault: boolean;
	isOwner: boolean;
	description?: string;
}
