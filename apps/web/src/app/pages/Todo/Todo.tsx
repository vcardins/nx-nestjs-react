import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_check } from 'react-icons-kit/md/ic_check';
import { ic_check_box } from 'react-icons-kit/md/ic_check_box';
import { ic_send } from 'react-icons-kit/md/ic_send';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import {
	Page,
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

import { useStore } from '@xapp/state';
import { TodoInput } from '@xapp/shared/types';

import { validationSchema } from './schema';
import { TodoList, TodoItem, TodoIcon } from './components';
const initialValues: TodoInput = { title: '' };
const dateFormat = 'MMM D, YYYY h:mm A';

const TodoPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, read, save, remove, setComplete, error } = useStore((state) => state.todo);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<TodoInput>({
		initialValues,
		onSubmit: async (data: TodoInput & { id?: number }) => {
			save(data, data.id);
		},
	});

	useEffect(() => {
		read();
	}, [read]);

	if (error) {
		toast.error(error.message);
	}

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
					<Submit loading={submitting} success={success}>
						<Icon icon={ic_send} />
					</Submit>
					<Button onClick={() => read()}>
						<Icon icon={ic_refresh} />
					</Button>
				</FieldGroup>
			</Form>
			<TodoList>
				{items.map((todo) => {
					const { id, title, dateCreated, dateCompleted } = todo;
					const icon = !dateCompleted ? ic_check : ic_check_box;

					return (
						<TodoItem key={id} isCompleted={!!dateCompleted}>
							<InlineEdit text={title} onSetText={(title) => save({ ...todo, title }, id)} />
							<DateFormatter value={dateCreated} format={dateFormat} />
							<TodoIcon icon={ic_delete} onClick={() => remove(id)} />
							<TodoIcon
								icon={icon}
								onClick={() => setComplete(todo)}
								data-completed={!!dateCompleted}
								title={
									!dateCompleted
										? 'Mark as complete'
										: `Completed at: ${formatDateTime(dateCompleted)}. Click to uncompleted`
								}
							/>
						</TodoItem>
					);
				})}
			</TodoList>
		</Page>
	);
});

export default TodoPage;
