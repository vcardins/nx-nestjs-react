import React, { memo, useRef } from 'react';

import { Page, Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { IChangePasswordInput, IRoutedPageProps } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

const ChangePasswordPage = memo((props: IRoutedPageProps) => {
	const { changePassword } = useAppStore((state) => state.account);

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
					error={errors?.oldPassword}
				/>
				<TextInput
					type="password"
					label="New Password"
					name="newPassword"
					autoComplete="true"
					value={formData.newPassword}
					error={errors?.newPassword}
				/>
				<FieldGroup sided>
					<Submit loading={submitting} success={success} />
				</FieldGroup>
			</Form>
		</Page>
	);
});

export default ChangePasswordPage;
