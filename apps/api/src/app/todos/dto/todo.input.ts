import { User } from '@xapp/api/access-control';

export class TodoInput {
	title: string;
	assignee: User;
}
