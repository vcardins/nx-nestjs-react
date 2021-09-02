import React, { memo, useState, useRef, useEffect } from 'react';
import { parse } from 'query-string';

import { Panel, Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { IResetPasswordInput } from '@xapp/shared/types';

import { validationSchema } from './schema';
import { useAppStore } from '@xapp/state';
import { IRoutedPageProps } from '@xapp/shared/types';

const initialValues: IResetPasswordInput = {
	password: '',
	confirmPassword: '',
	verificationKey: '',
};

const ResetPasswordPage = memo((props: IRoutedPageProps) => {
	const { resetPassword } = useAppStore((state) => state.account);

	const { formData, handleSubmit, handleFieldChange, errors, submitting, success } = useForm<IResetPasswordInput>({
		initialValues,
		onSubmit: resetPassword,
	});

	const [verificationKey, setVerificationKey] = useState<string>();
	const formRef = useRef({ valid: false });

	useEffect(() => {
		const { key } = parse(document.location.search) || {};
		if (key) {
			setVerificationKey(key as string);
		}
	}, []);

	return (
		<Panel title="Change Password" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleFieldChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<input type="hidden" value={verificationKey} />
				<TextInput
					type="password"
					label="New Password"
					name="password"
					value={formData.password}
					error={errors?.password}
				/>
				<TextInput
					type="password"
					label="Confirm Password"
					name="confirmPassword"
					value={formData.confirmPassword}
					error={errors?.confirmPassword}
				/>
				<FieldGroup sided>
					<Submit loading={submitting} success={success} />
				</FieldGroup>
			</Form>
		</Panel>
	);
});

export default ResetPasswordPage;
