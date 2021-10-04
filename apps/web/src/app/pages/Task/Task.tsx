import React, { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_edit } from 'react-icons-kit/md/ic_edit';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import {
	Panel,
	Form,
	TextInput,
	FieldGroup,
	Drawer,
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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

	const form = useForm<TaskInput>({
		initialValues,
		validationSchema,
		onSuccess: handleClosePanel,
		onSubmit: save,
	});

	const { rooms, members, frequencies, templates, selectedTemplate } = useHouseholdTask({
		userId: auth.user.id,
		householdRoomId: form.data.householdRoomId,
		templateId: form.data.templateId,
		lookupState,
		activeHouseholdId: settingsState.activeHousehold,
	});

	useEffect(() => {
		if (selectedTemplate?.id) {
			form.onUpdateData({
				frequencyId: selectedTemplate?.frequencyId,
				estimatedCompletionTime: selectedTemplate?.estimatedCompletionTime,
				rewardPoints: selectedTemplate?.rewardPoints,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTemplate?.id]);

	useEffect(() => {
		if (settingsState.activeHousehold) {
			form.onUpdateData({
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

	function handleClosePanel() {
		setIsDrawerOpen(false);
	}

	function handleSubmitForm() {
		form.onSubmit();
	}

	return (
		<Panel title="Task" padded>
			<TaskList>
				{!items.length && (
					<p>No Tasks found</p>
				)}
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
								value={form.formData.invitation.firstName}
							/>
							<input
								type="text"
								name="invitation-email"
								value={form.formData.invitation.email}
							/>
							<TaskIcon icon={ic_save} onClick={() => invite({ taskId: task.id, ...form.formData.invitation })} />
						</TaskItemInvite> */}
					</TaskItem>
				))}
			</TaskList>
			<FieldGroup sided padded>
				<Button onClick={() => read()}>
					<Icon icon={ic_refresh} />
				</Button>
				<Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
					<Icon icon={ic_edit} />
				</Button>
			</FieldGroup>
			<Drawer
				id="task-form"
				isOpen={isDrawerOpen}
				size="400px"
				onClose={handleClosePanel}
				position="right"
				overflow="hidden"
			>
				<Form
					ref={formRef}
					data={form.data}
					onChange={form.onFieldChange}
					onSubmit={handleSubmitForm}
					schema={validationSchema}
				>
					<Panel
						tag="task-form"
						title="Create Task"
						padded
						footer={
							<FieldGroup sided>
								<Submit loading={form.submitting} success={form.success}>
									<Icon icon={ic_save} />
								</Submit>
								<Button onClick={handleClosePanel}>
									<Icon icon={ic_close} /> Close
								</Button>
							</FieldGroup>
						}
					>
						<Select
							name="householdRoomId"
							label="Room"
							value={form.data.householdRoomId ?? ''}
							items={rooms}
						/>
						{!!form.data.householdRoomId && (
							<Select
								name="templateId"
								label="Template"
								value={form.data.templateId ?? ''}
								items={templates}
							/>
						)}
						<TextInput
							type="text"
							label="Name"
							name="name"
							placeholder={selectedTemplate?.name}
							value={form.data.name}
							error={form.errors?.name}
						/>
						<TextInput
							type="textarea"
							label="Notes"
							name="description"
							component="textarea"
							autoComplete="true"
							value={form.data.description}
							error={form.errors?.description}
						/>
						<Select
							name="frequencyId"
							label="Frequency"
							value={form.data.frequencyId ?? selectedTemplate?.frequencyId ?? ''}
							items={frequencies}
						/>
						<TextInput
							type="number"
							label="Estimated Completion Time"
							name="estimatedCompletionTime"
							value={form.data.estimatedCompletionTime ?? selectedTemplate?.estimatedCompletionTime ?? ''}
							error={form.errors?.estimatedCompletionTime}
						/>
						<TextInput
							type="number"
							label="Reward Points"
							name="rewardPoints"
							value={form.data.rewardPoints ?? selectedTemplate?.rewardPoints ?? ''}
							error={form.errors?.rewardPoints}
						/>
						<Checkbox
							label="Active"
							name="isActive"
							value={form.data.isActive}
							error={form.errors?.isActive}
						/>
						<Select
							name="assignedUserId"
							label="Assign To"
							value={form.data.assignedUserId ?? ''}
							items={members}
						/>
					</Panel>
				</Form>
			</Drawer>
		</Panel>
	);
});

export default TaskPage;
