import React, { memo, useRef } from 'react';

import { Form, TextInput, Panel, Submit, FieldGroup, DatePicker, formatDate, useForm } from '@xapp/react';
import { IUserProfileInput } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

const UserProfilePage = memo(() => {
	const { userInfo, updateProfile } = useAppStore((state) => state.account);

	const form = useForm<IUserProfileInput>(
		{
			initialValues: userInfo?.profile ?? ({} as IUserProfileInput),
			clearAfterSubmit: false,
			onSubmit: updateProfile,
		},
		[userInfo?.profile?.firstName]
	);

	const handleDayChange = (dateOfBirth: Date) => {
		form.onFieldChange(form.data, { target: { name: 'dateOfBirth', value: formatDate(dateOfBirth) }});
	};

	const formRef = useRef({ valid: false });

	return (
		<Panel title="User Profile" padded>
			<Form
				ref={formRef}
				data={form.data}
				onChange={form.onFieldChange}
				onSubmit={form.onSubmit}
				schema={validationSchema}
			>
				<TextInput
					label="First Name"
					name="firstName"
					value={form.data.firstName ?? ''}
					error={form.errors?.firstName}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					value={form.data.lastName ?? ''}
					error={form.errors?.lastName}
				/>
				<TextInput
					label="Phone Number"
					name="phoneNumber"
					value={form.data.phoneNumber ?? ''}
					error={form.errors?.phoneNumber}
				/>
				<TextInput
					label="Avatar"
					name="avatar"
					value={form.data.pictureUrl ?? ''}
					error={form.errors?.pictureUrl}
				/>
				<DatePicker
					label="Date of Birth"
					name="dateOfBirth"
					value={form.data.dateOfBirth ?? ''}
					error={form.errors?.dateOfBirth}
					onDayChange={handleDayChange}
				/>
				<TextInput
					component="textarea"
					label="Bio"
					name="bio"
					value={form.data.bio ?? ''}
					error={form.errors?.bio}
				/>
				<FieldGroup sided>
					<Submit loading={form.submitting} success={form.success} />
				</FieldGroup>
			</Form>
		</Panel>
	);
});

export default UserProfilePage;
