import { IEvent } from '@xapp/api/core';
import { User } from '@xapp/api/users';
import { Household } from './entities/household.entity';

abstract class UserHouseholdEvent implements IEvent {
	constructor(public member: User, public household: Household){}
}

export class MemberAddedEvent  extends UserHouseholdEvent {
	constructor(public member: User, public household: Household){
		super(member, household);
	}
}
