import { User } from '@xapp/api/users';

export class TodoInput {
	title: string;
	assignee: User;
}
