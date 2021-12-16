import { TodoInput } from './TodoInput';

export class TodoOutput extends TodoInput {
	id: number;
	userId: number;
	createdAt: string;
	completedAt: string;
}
