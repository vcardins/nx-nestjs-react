import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import {
	Form,
	TextInput,
	FieldGroup,
	Submit,
	useForm,
	Button,
} from '@xapp/react';
import { HouseholdInvitationInput } from '@xapp/shared/types';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';

interface IHouseholdInvitationProps {
	householdId: HouseholdInvitationInput['householdId'];
	onClose: () => void;
}

export const HouseholdInvitation = memo((props: IHouseholdInvitationProps) => {
	const { householdId, onClose } = props;
	const initialValues: HouseholdInvitationInput = { email: '', firstName: '', householdId };
	const formRef = useRef({ valid: false });
	const { invite, error, clearError } = useStore((state) => state.household);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<HouseholdInvitationInput>({
		initialValues,
		validationSchema,
		onSubmit: invite,
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
			<TextInput
				type="text"
				label="Email"
				name="email"
				autoComplete="true"
				value={formData.email}
				error={errors?.['email']}
			/>
			<TextInput
				type="text"
				label="First Name"
				name="firstName"
				autoComplete="true"
				value={formData.firstName}
				error={errors?.['firstName']}
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

