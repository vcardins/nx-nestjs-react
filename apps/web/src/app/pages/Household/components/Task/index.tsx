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
import { TaskInput, TaskOutput, TaskTemplateOutput } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

interface IHouseholdTaskProps {
	roomId: TaskOutput['householdRoomId'];
	roomTypeId: number;
	onClose: () => void;
}

export const HouseholdTask = memo((props: IHouseholdTaskProps) => {
	const { roomId, roomTypeId, onClose } = props;
	const initialValues: TaskInput = {
		name: null,
		householdRoomId: roomId,
		estimatedCompletionTime: null,
		frequencyId: null,
		assignedUserId: null,
	};
	const formRef = useRef({ valid: false });
	const lookupState = useAppStore((state) => state.lookup);
	const [taskTemplates, setTaskTemplates] = useState<TaskTemplateOutput[]>([]);
	const { save, error, clearError } = useAppStore((state) => state.task);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<TaskInput>({
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
			data={formData}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={validationSchema}
		>
			<Select
				name="templateId"
				label="Template"
				value={formData.templateId}
				items={taskTemplates.map(({ id, name }) => ({ id, name }))}
			/>
			<Select
				name="frequencyId"
				label="Frequency"
				value={formData.frequencyId}
				items={lookupState?.data ? Object.values(lookupState?.data?.frequencies).map(({ id, name }) => ({ id, name })) : []}
			/>
			<TextInput
				type="text"
				label="Name"
				name="name"
				autoComplete="true"
				value={formData.name || ''}
				error={errors?.['name']}
			/>
			<TextInput
				type="number"
				label="Estimated Completion"
				name="estimatedCompletionTime"
				autoComplete="true"
				value={formData.estimatedCompletionTime || ''}
				error={errors?.['estimatedCompletionTime']}
			/>
			<TextInput
				type="text"
				label="Notes"
				name="notes"
				autoComplete="true"
				value={formData.notes}
				error={errors?.['notes']}
			/>
			<Select
				name="assignedUserId"
				label="Assign To"
				value={formData.assignedUserId}
				items={[]}
			/>

			<FieldGroup sided>
				<Submit loading={submitting} success={success}>
					Save
				</Submit>
				<Button onClick={onClose}>
					Cancel
				</Button>
			</FieldGroup>
		</Form>
	);
});

