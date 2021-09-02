import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
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
	InlineEdit,
	Select,
	Checkbox,
} from '@xapp/react';
import { TaskInput } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';
import { TaskList, TaskItem, TaskIcon, TaskItemInfo } from './components';
import { useHouseholdTask } from './useHouseholdTask';

const TaskPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, isApiReady, read, save, remove, error, clearError } = useAppStore((state) => state.task);
	const { lookup: lookupState, settings: settingsState, auth } = useAppStore();

	const initialValues: TaskInput = {
		name: '',
		description: '',
		estimatedCompletionTime: null,
		householdId: settingsState.activeHousehold,
		templateId:  null,
		frequencyId: null,
		householdRoomId: null,
		isActive: true,
		daysOfWeek: null,
		rewardPoints: null,
		assignedUserId: auth.user.id
	};

	const { formData, handleSubmit, handleFieldChange, handleFormChange, errors, submitting, success } = useForm<TaskInput>({
		initialValues,
		validationSchema,
		onSubmit: save,
	});

	const { rooms, members, frequencies, templates, selectedTemplate } = useHouseholdTask({
		userId: auth.user.id,
		householdRoomId: formData.householdRoomId,
		templateId: formData.templateId,
		lookupState,
		activeHouseholdId: settingsState.activeHousehold,
	});

	useEffect(() => {
		if (selectedTemplate?.id) {
			handleFormChange({
				frequencyId: selectedTemplate?.frequencyId,
				estimatedCompletionTime: selectedTemplate?.estimatedCompletionTime,
				rewardPoints: selectedTemplate?.rewardPoints,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTemplate?.id]);

	useEffect(() => {
		if (settingsState.activeHousehold) {
			handleFormChange({
				householdId: settingsState.activeHousehold,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settingsState.activeHousehold]);

	useEffect(() => {
		if (isApiReady && settingsState.activeHousehold) {
			read(null, settingsState.activeHousehold);
		}
	}, [read, isApiReady, settingsState.activeHousehold]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	return (
		<Panel title="Task" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleFieldChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<Select
					name="householdRoomId"
					label="Room"
					value={formData.householdRoomId ?? ''}
					items={rooms}
				/>
				{!!formData.householdRoomId && (
					<Select
						name="templateId"
						label="Template"
						value={formData.templateId ?? ''}
						items={templates}
					/>
				)}
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
					name="description"
					component="textarea"
					autoComplete="true"
					value={formData.description}
					error={errors?.description}
				/>
				<Select
					name="frequencyId"
					label="Frequency"
					value={formData.frequencyId ?? selectedTemplate?.frequencyId ?? ''}
					items={frequencies}
				/>
				<TextInput
					type="number"
					label="Estimated Completion Time"
					name="estimatedCompletionTime"
					value={formData.estimatedCompletionTime ?? selectedTemplate?.estimatedCompletionTime ?? ''}
					error={errors?.estimatedCompletionTime}
				/>
				<TextInput
					type="number"
					label="Reward Points"
					name="rewardPoints"
					value={formData.rewardPoints ?? selectedTemplate?.rewardPoints ?? ''}
					error={errors?.rewardPoints}
				/>
				<Checkbox
					label="Active"
					name="isActive"
					value={formData.isActive}
					error={errors?.isActive}
				/>
				<Select
					name="assignedUserId"
					label="Assign To"
					value={formData.assignedUserId ?? ''}
					items={members}
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
		</Panel>
	);
});

export default TaskPage;
