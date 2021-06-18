import { TaskInput, TaskInvitationInput, TaskInvitationWelcome, TaskOutput , TaskMemberSignup } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class TaskStore extends DataContext<TaskOutput, TaskInput> {
	constructor(authHeader?: string) {
		super({ basePath: 'task', authHeader });
	}

	invite = (data: TaskInvitationInput) =>
		this.create({ url: 'invite', data });

	getInvitation = (invitationCode: string) =>
		this.read<{ url: string; }, TaskInvitationWelcome>({ url: `invitation/${invitationCode}` });

	signUpMember = (data: TaskMemberSignup) => {
		return this.create({ url: 'signup', data });
	}
}
