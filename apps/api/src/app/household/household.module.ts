import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { HouseholdCategory } from './entities/household_category.entity';
import { Household } from './entities/household.entity';
import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { HouseholdMembers } from './entities/household_members.entity';

import { HouseholdService } from './household.service';

@Module({
	imports: [
		DatabaseModule.forFeature([
			HouseholdCategory,
			Household,
			HouseholdMemberInvitation,
			HouseholdMembers,
		]),
	],
	providers: [HouseholdService],
	exports: [HouseholdService],
})
export class HouseholdModule {}
