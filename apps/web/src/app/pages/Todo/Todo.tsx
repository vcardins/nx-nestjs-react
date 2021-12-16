import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_check } from 'react-icons-kit/md/ic_check';
import { ic_check_box } from 'react-icons-kit/md/ic_check_box';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import {
	Panel,
	Form,
	TextInput,
	FieldGroup,
	Submit,
	useForm,
	Button,
	Icon,
	DateFormatter,
	formatDateTime,
	InlineEdit,
} from '@xapp/react';

import { useAppStore } from '@xapp/state';
import { TodoInput, TodoOutput } from '@xapp/shared/types';

import { validationSchema } from './schema';
import { TodoList, TodoItem, TodoIcon } from './components';
const initialValues: TodoInput = { title: '' };
const dateFormat = 'MMM D, YYYY h:mm A';

const TodoPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, isApiReady, read, save, remove, setComplete, error, clearError } = useAppStore((state) => state.todo);

	const form = useForm<TodoInput>({
		initialValues,
		onSubmit: async (data: TodoInput & { id?: number }) => {
			save(data, data.id);
		},
	});

	useEffect(() => {
		if (isApiReady) {
			read();
		}
	}, [isApiReady, read]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	function handleSave(title: string, id: number) {
		save({ title }, id)
	}

	return (
		<Panel title="Todo" padded>
			<Form
				ref={formRef}
				data={form.data}
				onChange={form.onFieldChange}
				onSubmit={form.onSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="text"
					label="Title"
					name="title"
					autoComplete="true"
					value={form.data.title}
					error={form.errors?.title}
				/>
				<FieldGroup sided>
					<Submit loading={form.submitting} success={form.success}>
						<Icon icon={ic_save} />
					</Submit>
					<Button onClick={() => read()}>
						<Icon icon={ic_refresh} />
					</Button>
				</FieldGroup>
			</Form>
			<TodoList>
				{(items || []).map(renderItem)}
			</TodoList>
		</Panel>
	);

	function renderItem(todo: TodoOutput) {
		const icon = !todo.completedAt ? ic_check : ic_check_box;

		return (
			<TodoItem key={todo.id} isCompleted={!!todo.completedAt}>
				<InlineEdit
					text={todo.title}
					onSetText={(title) => title !== todo.title ? handleSave(title, todo.id) : undefined}
				/>
				<DateFormatter value={todo.createdAt} format={dateFormat} />
				<TodoIcon icon={ic_delete} onClick={() => remove(todo.id)} />
				<TodoIcon
					icon={icon}
					onClick={() => setComplete(todo)}
					data-completed={!!todo.completedAt}
					title={
						!todo.completedAt
							? 'Mark as complete'
							: `Completed at: ${formatDateTime(todo.completedAt)}. Click to uncompleted`
					}
				/>
			</TodoItem>
		);
	}
});

export default TodoPage;
