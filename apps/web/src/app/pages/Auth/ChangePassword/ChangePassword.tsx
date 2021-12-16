import React, { memo, useRef } from 'react';

import { Panel, Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { IChangePasswordInput, IRoutedPageProps } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

const ChangePasswordPage = memo((props: IRoutedPageProps) => {
	const { changePassword } = useAppStore((state) => state.account);

	const form = useForm<IChangePasswordInput>({
		initialValues: {
			oldPassword: '',
			newPassword: '',
		},
		onSubmit: changePassword,
	});
	const formRef = useRef({ valid: false });

	return (
		<Panel title="Change Password" padded>
			<Form
				ref={formRef}
				data={form.data}
				onChange={form.onFieldChange}
				onSubmit={form.onSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="password"
					label="Old Password"
					name="oldPassword"
					autoComplete="true"
					value={form.data.oldPassword}
					error={form.errors?.oldPassword}
				/>
				<TextInput
					type="password"
					label="New Password"
					name="newPassword"
					autoComplete="true"
					value={form.data.newPassword}
					error={form.errors?.newPassword}
				/>
				<FieldGroup sided>
					<Submit loading={form.submitting} success={form.success} />
				</FieldGroup>
			</Form>
		</Panel>
	);
});

export default ChangePasswordPage;
