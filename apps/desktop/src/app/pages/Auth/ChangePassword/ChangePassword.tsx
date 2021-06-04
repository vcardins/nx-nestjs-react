import React, { memo, useRef } from 'react';

import { Page, Form, TextInput, FieldGroup, Submit, IRoutedPageProps, useForm } from '@xapp/react/core';
import { IChangePasswordInput } from '@xapp/shared/auth';
import { validationSchema } from './schema';
import { useStore } from '@xapp/state';

const ChangePasswordPage = memo((props: IRoutedPageProps) => {
	const { changePassword } = useStore((state) => state.account);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<IChangePasswordInput>({
		initialValues: {
			oldPassword: '',
			newPassword: '',
		},
		onSubmit: changePassword,
	});
	const formRef = useRef({ valid: false });

	return (
		<Page title="Change Password" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="password"
					label="Old Password"
					name="oldPassword"
					autoComplete="true"
					value={formData.oldPassword}
					error={errors?.['oldPassword']}
				/>
				<TextInput
					type="password"
					label="New Password"
					name="newPassword"
					autoComplete="true"
					value={formData.newPassword}
					error={errors?.['newPassword']}
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

export default ChangePasswordPage;
