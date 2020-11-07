import React, { memo, useContext, useRef } from 'react';
import { validationSchema } from './schema';

import { Form, TextInput, Page, Submit, FieldGroup, useForm } from '@xapp/react/core';
import { IUserProfileInput } from '@xapp/shared/interfaces';
import { AccountService } from '@xapp/react/auth';
import { appContext } from '../../../AppContextProvider';

const UserProfilePage = memo(() => {
	const { userProfile, onUpdateUserProfile } = useContext(appContext);
	const {formData, handleSubmit, handleChange, errors, submitting, success} = useForm<IUserProfileInput>({
		initialValues: userProfile,
		clearAfterSubmit: false,
		onSubmit: async (data) => {
			const response = await AccountService.updateProfile(data);
			onUpdateUserProfile(response);
		},
	});
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
					value={formData.firstName}
					error={errors?.['firstName']}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					value={formData.lastName}
					error={errors?.['lastName']}
				/>
				<TextInput
					label="Phone Number"
					name="phoneNumber"
					value={formData.mobile}
					error={errors?.['mobile']}
				/>
				<TextInput
					label="Avatar"
					name="avatar"
					value={formData.pictureUrl}
					error={errors?.['pictureUrl']}
				/>
				<TextInput
					component="textarea"
					label="Bio"
					name="bio"
					value={formData.bio}
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
