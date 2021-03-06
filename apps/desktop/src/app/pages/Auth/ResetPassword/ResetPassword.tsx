import React, { memo, useState, useRef, useEffect } from 'react';
import { parse } from 'query-string';

import { Page, Form, TextInput, FieldGroup, Submit, IRoutedPageProps, useForm } from '@xapp/react/core';
import { IResetPasswordInput } from '@xapp/shared/interfaces';

import { validationSchema } from './schema';
import { useApp } from '../../../context';

const initialValues: IResetPasswordInput = {
	password: '',
	confirmPassword: '',
	verificationKey: '',
};

const ResetPasswordPage = memo((props: IRoutedPageProps) => {
	const { dataContext } = useApp();
	const api = dataContext?.account;

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<IResetPasswordInput>({
		initialValues,
		onSubmit: api.resetPassword,
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
		<Page title="Change Password" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<input type="hidden" value={verificationKey}/>
				<TextInput
					type="password"
					label="New Password"
					name="password"
					autoComplete="true"
					value={formData.password}
					error={errors?.['password']}
				/>
				<TextInput
					type="password"
					label="Confirm Password"
					name="confirmPassword"
					autoComplete="true"
					value={formData.confirmPassword}
					error={errors?.['confirmPassword']}
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

export default ResetPasswordPage;
