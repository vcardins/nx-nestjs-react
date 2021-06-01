import React, { memo, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Form, TextInput, FieldGroup, Submit, PageKey, useForm } from '@xapp/react/core';
import { IForgotPasswordInput } from '@xapp/shared/interfaces';

import { validationSchema } from './schema';
import { appContext, useApp } from '../../../context';

const initialValues: IForgotPasswordInput = {
	email: '',
};

const ForgotPasswordPage = memo(() => {
	const { routes } = useContext(appContext);
	const { dataContext } = useApp();
	const api = dataContext?.account;

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<IForgotPasswordInput>({
		initialValues,
		onSubmit: api.forgotPassword,
	});
	const formRef = useRef({ valid: false });

	const routing = {
		signIn: routes[PageKey.SignIn],
		signUp: routes[PageKey.SignUp],
	};

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
			<FieldGroup sided>
				<Submit
					loading={submitting}
					success={success}
				/>
			</FieldGroup>
			<FieldGroup>
				<Link to={routing.signIn.path}>
					{routing.signIn.title}
				</Link>
				<Link to={routing.signUp.path}>
					{routing.signUp.title}
				</Link>
			</FieldGroup>
		</Form>
	);
});

export default ForgotPasswordPage;
