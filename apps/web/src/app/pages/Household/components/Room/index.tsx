import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import {
	Form,
	TextInput,
	Select,
	FieldGroup,
	Submit,
	useForm,
	Button,
} from '@xapp/react';
import { HouseholdRoomInput, HouseholdRoomOutput } from '@xapp/shared/types';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';

interface IHouseholdRoomProps {
	householdId: HouseholdRoomOutput['householdId'];
	items: HouseholdRoomOutput[];
	onClose: () => void;
}

export const HouseholdRoom = memo((props: IHouseholdRoomProps) => {
	const { householdId, onClose } = props;
	const initialValues: HouseholdRoomInput = { customName: '', roomTypeId: undefined, householdId };
	const formRef = useRef({ valid: false });
	const lookupState = useStore((state) => state.lookup);
	const { addRoom, error, clearError } = useStore((state) => state.household);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<HouseholdRoomInput>({
		initialValues,
		validationSchema,
		onSubmit: addRoom,
	});

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	return (
		<Form
			ref={formRef}
			data={formData}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={validationSchema}
		>
			<Select
				name="roomTypeId"
				label="Room Type"
				keyValueProps={{ id: 'name' }}
				value={formData.roomTypeId}
				items={lookupState?.data ? Object.values(lookupState?.data?.roomTypes).map(({ id, name }) => ({ id, name })) : []}
			/>
			<TextInput
				type="text"
				label="Custom Name"
				name="customName"
				autoComplete="true"
				value={formData.customName}
				error={errors?.['customName']}
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

