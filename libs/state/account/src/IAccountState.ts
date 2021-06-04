import { IEndpointsConfig, ISignedUserOutput } from '@xapp/shared/interfaces';
import { IAuthState, IStoreState } from '@xapp/state/shared';
import { AccountStore } from '.';

export interface IAccountState extends
	Omit<IStoreState<AccountStore>, 'init'>,
	Pick<AccountStore,
		'signUp' |
		'verifyEmail' |
		'verifyPhoneNumber' |
		'forgotPassword' |
		'updateProfile' |
		'getUserProfile' |
		'closeAccount' |
		'reopenAccount' |
		'changePhoneNumber' |
		'changePassword' |
		'resetPassword'
	>
{
	userInfo: ISignedUserOutput;
	init: (props: IAuthState, endpoints: IEndpointsConfig) => void;
}
