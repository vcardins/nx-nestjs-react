import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
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
	InlineEdit,
} from '@xapp/react';
import { TaskInput } from '@xapp/shared/types';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';
import { TaskList, TaskItem, TaskIcon, TaskItemInfo, TaskItemInvite } from './components';

const initialValues: TaskInput = { name: '' };

const TaskPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, store, read, save, remove, invite, error } = useStore((state) => state.task);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<TaskInput>({
		initialValues,
		onSubmit: save,
	});

	useEffect(() => {;
		if (store){
			read();
		}
	}, [read, store]);

	if (error) {
		toast.error(error.message);
	}

	return (
		<Page title="Task" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="text"
					label="Name"
					name="name"
					autoComplete="true"
					value={formData.name}
					error={errors?.['name']}
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
			<TaskList>
				{items.map((task) => (
					<TaskItem key={task.id}>
						<TaskItemInfo>
							<InlineEdit text={task.name} onSetText={(name) => save({ ...task, name }, task.id)} />
							<TaskIcon icon={ic_delete} onClick={() => remove(task.id)} />
						</TaskItemInfo>
						{/* <TaskItemInvite>
							<input
								type="text"
								name="invitation-firstName"
								value={formData.invitation.firstName}
							/>
							<input
								type="text"
								name="invitation-email"
								value={formData.invitation.email}
							/>
							<TaskIcon icon={ic_send} onClick={() => invite({ taskId: task.id, ...formData.invitation })} />
						</TaskItemInvite> */}
					</TaskItem>
				))}
			</TaskList>
		</Page>
	);
});

export default TaskPage;
