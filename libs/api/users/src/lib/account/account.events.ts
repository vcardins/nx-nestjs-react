import { IEvent } from '@xapp/api/core';
import { User } from '../entities/user.entity';

abstract class UserAccountEvent implements IEvent {
	constructor(public user: User){}
}

export class AccountCreatedEvent extends UserAccountEvent {
	// InitialPassword might be null if this is a re-send
	// notification for account created (when user tries to
	// reset password before verifying their account)
	constructor(
		user: User,
		public verificationKey: string,
	) {
		super(user);
	}
}

export class EmailVerifiedEvent  extends UserAccountEvent {
	constructor(user: User, public isNewAccount?: boolean) {
		super(user);
	}
}

export class AccountUnlockedEvent  extends UserAccountEvent {}

export class PasswordResetFailedEvent  extends UserAccountEvent {}

export class PasswordResetRequestedEvent  extends UserAccountEvent {
	constructor(
		user: User,
		public verificationKey: string,
	) {
		super(user);
	}
}
export class PasswordChangedEvent  extends UserAccountEvent {
	constructor(public user: User, public newPassword: string){
		super(user);
	}
}

export class AccountClosedEvent  extends UserAccountEvent {}
export class AccountReopenedEvent  extends UserAccountEvent {
	constructor(public user: User, public verificationKey: string){
		super(user);
	}
}

export class UsernameChangedEvent  extends UserAccountEvent {
	constructor(public user: User, public oldUsername: string, public newUsername: string){
		super(user);
	}
}

export class EmailChangeRequestedEvent  extends UserAccountEvent {
	constructor(public user: User, public oldEmail: string, public newEmail: string, public verificationKey: string){
		super(user);
	}
}
export class EmailChangedEvent  extends UserAccountEvent {
	oldEmail: string;
	verificationKey: string;
}

export class MobilePhoneChangeRequestedEvent  extends UserAccountEvent {
	newPhoneNumber: string;
	code: string;
}

export class MobilePhoneChangedEvent  extends UserAccountEvent {}

export class MobilePhoneRemovedEvent  extends UserAccountEvent {}

export class MobileVerifiedEvent  extends UserAccountEvent {
	code: string;
}

abstract class SuccessfulLoginEvent  extends UserAccountEvent {}
export class SuccessfulPasswordLoginEvent extends SuccessfulLoginEvent {}

abstract class FailedLoginEvent  extends UserAccountEvent {}
export class AccountNotVerifiedEvent extends FailedLoginEvent {}
export class AccountLockedEvent extends FailedLoginEvent {}
export class InvalidAccountEvent extends FailedLoginEvent {}
export class TooManyRecentPasswordFailuresEvent extends FailedLoginEvent {}
export class InvalidPasswordEvent extends FailedLoginEvent {}

// export class TwoFactorAuthenticationCodeNotificationEvent  extends UserAccountEvent
// {
// 	code: string;
// }

// export class TwoFactorAuthenticationTokenCreatedEvent  extends UserAccountEvent
// {
// 	token: string;
// }
// export class ClaimAddedEvent  extends UserAccountEvent, IAllowMultiple
// {
// 	claim: UserClaim;
// }
// export class ClaimRemovedEvent  extends UserAccountEvent, IAllowMultiple
// {
// 	claim: UserClaim;
// }
// export class ExternalLoginAddedEvent  extends UserAccountEvent, IAllowMultiple
// {
// 	externalLogin: ExternalLogin;
// }
// export class ExternalLoginRemovedEvent  extends UserAccountEvent, IAllowMultiple
// {
// 	externalLogin: ExternalLogin;
// }
