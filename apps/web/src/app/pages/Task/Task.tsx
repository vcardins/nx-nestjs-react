import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
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
	Select,
} from '@xapp/react';
import { TaskInput } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';
import { TaskList, TaskItem, TaskIcon, TaskItemInfo } from './components';


const initialValues: TaskInput = {
	name: '',
	notes: '',
	estimatedCompletionTime: 0,
	templateId:  0,
	frequencyId:  0,
	householdRoomId:  0,
};

const TaskPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, isApiReady, read, save, remove, error, clearError } = useAppStore((state) => state.task);
	const { lookup: lookupState, settings: settingsState } = useAppStore();

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<TaskInput>({
		initialValues,
		validationSchema,
		onSubmit: save,
	});

	const activeHousehold = useMemo(() =>
		lookupState.households?.find(({ id }) => id === settingsState.activeHousehold),
	[lookupState.households, settingsState.activeHousehold]);

	const rooms = useMemo(() => activeHousehold?.rooms
		? activeHousehold?.rooms.map(({ id, name, customName }) => ({ id, name: customName ?? name }))
		: []
	, [activeHousehold?.rooms]);

	const selectedRoom = useMemo(() => (activeHousehold && formData.householdRoomId)
		? activeHousehold?.rooms?.find(({ id }) => id === Number(formData.householdRoomId))
		: null
	, [activeHousehold, formData.householdRoomId]);

	const templates = useMemo(() => selectedRoom?.roomTypeId
		? lookupState?.tasksTemplates?.[selectedRoom?.roomTypeId]
		: []
	, [lookupState?.tasksTemplates, selectedRoom?.roomTypeId]);

	const selectedTemplate = useMemo(() => (templates && formData.templateId)
		? templates.find(({ id }) => id === Number(formData.templateId))
		: null
	, [formData.templateId, templates]);

	const frequencies = useMemo(() => lookupState?.frequencies
		? Object.values(lookupState?.frequencies).map(({ id, name }) => ({ id, name }))
		: []
	, [lookupState?.frequencies]);

	useEffect(() => {
		if (isApiReady) {
			read();
		}
	}, [read, isApiReady]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	return (
		<Page title="Task" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<Select
					name="householdRoomId"
					label="Room"
					value={formData.householdRoomId}
					items={rooms}
				/>
				<Select
					name="templateId"
					label="Template"
					value={formData.templateId}
					items={templates}
				/>
				<TextInput
					type="text"
					label="Name"
					name="name"
					placeholder={selectedTemplate?.name}
					value={formData.name}
					error={errors?.name}
				/>
				<TextInput
					type="textarea"
					label="Notes"
					name="notes"
					autoComplete="true"
					value={formData.notes}
					error={errors?.notes}
				/>
				<Select
					name="frequencyId"
					label="Frequency"
					value={formData.frequencyId ?? selectedTemplate?.frequencyId}
					items={frequencies}
				/>
				<TextInput
					type="number"
					label="Estimated Completion Time"
					name="estimatedCompletionTime"
					value={formData.estimatedCompletionTime ?? selectedTemplate?.estimatedTime}
					error={errors?.estimatedCompletionTime}
				/>
				<FieldGroup sided>
					<Submit loading={submitting} success={success}>
						<Icon icon={ic_save} />
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
							<TaskIcon icon={ic_save} onClick={() => invite({ taskId: task.id, ...formData.invitation })} />
						</TaskItemInvite> */}
					</TaskItem>
				))}
			</TaskList>
		</Page>
	);
});

export default TaskPage;
