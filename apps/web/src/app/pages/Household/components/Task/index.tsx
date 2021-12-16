import React, { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
	Form,
	TextInput,
	Select,
	FieldGroup,
	Submit,
	Button,
	useForm,
} from '@xapp/react';
import { TaskInput, TaskOutput, TaskTemplateOutput, Frequencies } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

interface IHouseholdTaskProps {
	householdId: TaskOutput['householdId'];
	roomId: TaskOutput['householdRoomId'];
	roomTypeId: number;
	onClose: () => void;
}

export const HouseholdTask = memo((props: IHouseholdTaskProps) => {
	const { householdId, roomId, roomTypeId, onClose } = props;
	const initialValues: TaskInput = {
		name: null,
		householdRoomId: roomId,
		householdId,
		estimatedCompletionTime: null,
		assignedUserId: null,
		isActive: true,
		daysOfWeek: 0,
		rewardPoints: 1,
		frequencyId: Frequencies.Weekly,
	};
	const formRef = useRef({ valid: false });
	const lookupState = useAppStore((state) => state.lookup);
	const [taskTemplates, setTaskTemplates] = useState<TaskTemplateOutput[]>([]);
	const { save, error, clearError } = useAppStore((state) => state.task);

	const form = useForm<TaskInput>({
		initialValues,
		validationSchema,
		onSubmit: save,
	});

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	useEffect(() => {
		if (roomTypeId && lookupState?.tasksTemplates) {
			setTaskTemplates(lookupState?.tasksTemplates[roomTypeId] || []);
		}
	}, [roomTypeId, lookupState?.tasksTemplates]);

	return (
		<Form
			ref={formRef}
			data={form.data}
			onChange={form.onFieldChange}
			onSubmit={form.onSubmit}
			schema={validationSchema}
		>
			<Select
				name="templateId"
				label="Template"
				value={form.data.templateId}
				items={taskTemplates.map(({ id, name }) => ({ id, name }))}
			/>
			<Select
				name="frequencyId"
				label="Frequency"
				value={form.data.frequencyId}
				items={lookupState?.data ? Object.values(lookupState?.data?.frequencies).map(({ id, name }) => ({ id, name })) : []}
			/>
			<TextInput
				type="text"
				label="Name"
				name="name"
				autoComplete="true"
				value={form.data.name || ''}
				error={form.errors?.name}
			/>
			<TextInput
				type="number"
				label="Estimated Completion"
				name="estimatedCompletionTime"
				autoComplete="true"
				value={form.data.estimatedCompletionTime || ''}
				error={form.errors?.estimatedCompletionTime}
			/>
			<TextInput
				type="text"
				label="Notes"
				name="description"
				autoComplete="true"
				value={form.data.description}
				error={form.errors?.description}
			/>
			<Select
				name="assignedUserId"
				label="Assign To"
				value={form.data.assignedUserId}
				items={[]}
			/>

			<FieldGroup sided>
				<Submit loading={form.submitting} success={form.success}>
					Save
				</Submit>
				<Button onClick={onClose}>
					Cancel
				</Button>
			</FieldGroup>
		</Form>
	);
});

