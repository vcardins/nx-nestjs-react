
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_check } from 'react-icons-kit/md/ic_check';
import { ic_check_box } from 'react-icons-kit/md/ic_check_box';
import { ic_send } from 'react-icons-kit/md/ic_send';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import { Page, Form, TextInput, FieldGroup, Submit, useForm, Button, Icon } from '@xapp/react/core';
import { DateFormatter, formatDateTime } from '@xapp/react/core';
import { InlineEdit } from '@xapp/react/core';

import { TodoOutput } from './TodoOutput';
import { TodoInput } from './TodoInput';

import { validationSchema } from './schema';
import { useApp } from '../../context';
import { TodoList, TodoItem, TodoIcon } from './components';

const initialValues: TodoInput = { title: '' };
const dateFormat = 'MMM D, YYYY h:mm A';

const TodoPage = memo(() => {
	const { dataContext } = useApp();
	const api = dataContext?.todo;

	const [todos, setTodos] = useState<TodoOutput[]>([]);
	const formRef = useRef({ valid: false });

	const handleRefresh = useCallback(async () => setTodos(await api.readAll()), [api]);

	const handleDelete = useCallback(async (id: number) => {
		try {
			await api.delete(id);
			const updated = todos.filter((todo) => todo.id !== id);
			setTodos(updated);
		}
		catch (e) {}
	}, [api, todos]);

	const handleComplete = useCallback(async (todo: TodoOutput) => {
		try {
			const response = await api.complete(todo.id, !!todo.dateCompleted);
			const index = todos.findIndex(({ id }) => id === response.id);

			setTodos([
				...todos.slice(0, index),
				response,
				...todos.slice(index + 1),
			]);
		}
		catch (e) {}
	}, [api, todos]);

	const handleEdit = useCallback(async (todo: TodoOutput, title: string) => {
		try {
			const index = todos.findIndex(({ id }) => id === todo.id);
			const updated = { ...todo, title };
			const response = await api.update({ data: updated });

			setTodos([
				...todos.slice(0, index),
				response,
				...todos.slice(index + 1),
			]);
		}
		catch (e) {}
	}, [api, todos]);

	const handleSuccess = useCallback(async (todo: TodoOutput) => {
		setTodos([...todos, todo]);
	}, [todos]);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<TodoInput>({
		initialValues,
		onSubmit: async (data: TodoInput & { id: number }) => {
			const values = !data.id
				? await api.create({ data })
				: await api.update({ data });

			handleSuccess(values);

			return values;
		},
	});

	useEffect(() => {
		(async () => {
			try {
				await handleRefresh();
			}
			catch {
				setTodos([]);
			}
		})();
	}, [handleRefresh]);

	return (
		<Page title="Todo" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="text"
					label="Title"
					name="title"
					autoComplete="true"
					value={formData.title}
					error={errors?.['title']}
				/>
				<FieldGroup sided>
					<Submit
						loading={submitting}
						success={success}
					>
						<Icon icon={ic_send} />
					</Submit>
					<Button onClick={handleRefresh}>
						<Icon icon={ic_refresh} />
					</Button>
				</FieldGroup>
			</Form>
			<TodoList>
				{todos.map((todo) => {
					const { id, title, dateCreated, dateCompleted } = todo;
					const icon = !dateCompleted ? ic_check : ic_check_box;

					return (
						<TodoItem key={id} isCompleted={!!dateCompleted}>
							<InlineEdit
								text={title}
								onSetText={(text) => handleEdit(todo, text)}
							/>
							<DateFormatter value={dateCreated} format={dateFormat}/>
							<TodoIcon
								icon={ic_delete}
								onClick={() => handleDelete(id)}
							/>
							<TodoIcon
								icon={icon}
								onClick={() => handleComplete(todo)}
								data-completed={!!dateCompleted}
								title={!dateCompleted ? 'Mark as complete' : `Completed at: ${formatDateTime(dateCompleted)}. Click to uncompleted`}
							/>
						</TodoItem>
					);
				})}
			</TodoList>
		</Page>
	);
});

export default TodoPage;
