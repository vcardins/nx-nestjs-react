import React, { memo, useContext, useRef } from 'react';

import { Form, TextInput, Page, Submit, FieldGroup, DatePicker, formatDate, useForm } from '@xapp/react/core';
import { IUserProfileInput } from '@xapp/shared/interfaces';

import { appContext, useApp } from '../../../context';
import { validationSchema } from './schema';

const UserProfilePage = memo(() => {
	const { user, onUpdateUserProfile } = useContext(appContext);
	const { dataContext } = useApp();
	const api = dataContext?.account;

	const {formData, handleSubmit, handleChange, errors, submitting, success} = useForm<IUserProfileInput>({
		initialValues: user?.profile ?? {} as IUserProfileInput,
		clearAfterSubmit: false,
		onSubmit: async (data) => {
			const response = await api?.updateProfile(data);
			onUpdateUserProfile(response);
		},
	}, [user?.profile?.firstName]);

	const handleDayChange = (dateOfBirth: Date) => {
		handleChange({ ...formData, dateOfBirth: formatDate(dateOfBirth) });
	};

	const formRef = useRef({ valid: false });

	return (
		<Page title="User Profile" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					label="First Name"
					name="firstName"
					value={formData.firstName ?? ''}
					error={errors?.['firstName']}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					value={formData.lastName ?? ''}
					error={errors?.['lastName']}
				/>
				<TextInput
					label="Phone Number"
					name="phoneNumber"
					value={formData.phoneNumber ?? ''}
					error={errors?.['phoneNumber']}
				/>
				<TextInput
					label="Avatar"
					name="avatar"
					value={formData.pictureUrl ?? ''}
					error={errors?.['pictureUrl']}
				/>
				<DatePicker
					label="Date of Birth"
					name="dateOfBirth"
					value={formData.dateOfBirth ?? ''}
					error={errors?.['dateOfBirth']}
					onDayChange={handleDayChange}
				/>
				<TextInput
					component="textarea"
					label="Bio"
					name="bio"
					value={formData.bio ?? ''}
					error={errors?.['bio']}
				/>
				<FieldGroup sided>
					<Submit
						loading={submitting}
						success={success}
					/>
				</FieldGroup>
			</Form>
		</Page>
	);
});

export default UserProfilePage;
