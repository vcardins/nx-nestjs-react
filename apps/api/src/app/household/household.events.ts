import { IEvent } from '@xapp/api/core';
import { User } from '@xapp/api/access-control';
import { HouseholdInvitationOutput } from '@xapp/shared/types';
import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';

abstract class UserHouseholdEvent implements IEvent {
	constructor(public household: Household, public member?: User){}

	run() {}
}

export class MemberInvitedEvent extends UserHouseholdEvent {
	constructor(public household: Household, model: HouseholdInvitationOutput, public member?: User){
		super(household, member);
	}

	run() {
		// 'Running event';
	}
}

export class MemberAddedEvent extends UserHouseholdEvent {
	constructor(public household: Household, model: HouseholdMember, public member?: User){
		super(household, member);
	}

	run() {
		// 'Running MemberAddedEvent event';
	}
}
