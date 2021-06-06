import React, { memo, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { validationSchema } from './schema';

import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react/core';
import { ISignUpInput } from '@xapp/shared/auth';
import { useStore } from '@xapp/state';

import { appContext } from '../../../context';
import { PageKey } from '@xapp/shared/types';

const initialValues: ISignUpInput = {
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpPage = memo(() => {
	const { routes } = useContext(appContext);
	const { signUp } = useStore((state) => state.account);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<ISignUpInput>({
		initialValues,
		onSubmit: signUp,
	});
	const formRef = useRef({ valid: false });

	const route = {
		signIn: routes[PageKey.SignIn],

		forgotPassword: routes[PageKey.ForgotPassword],
	};

	return (
		<Form
			ref={formRef}
			data={formData}
			disabled={submitting}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={validationSchema}
		>
			<TextInput label="Username" name="username" value={formData.username} error={errors?.['username']} />
			<TextInput label="Email" name="email" value={formData.email} error={errors?.['email']} />
			<TextInput
				type="password"
				label="Password"
				name="password"
				value={formData.password}
				error={errors?.['password']}
			/>
			<TextInput
				type="password"
				label="Confirm Password"
				name="confirmPassword"
				value={formData.confirmPassword}
				error={errors?.['confirmPassword']}
			/>
			<TextInput label="First Name" name="firstName" value={formData.firstName} error={errors?.['firstName']} />
			<TextInput label="Last Name" name="lastName" value={formData.lastName} error={errors?.['lastName']} />
			<FieldGroup sided>
				<Submit loading={submitting} success={success} />
			</FieldGroup>
			<FieldGroup>
				<Link to={route.signIn.path?.split(':')[0]}>{route.signIn.title}</Link>
				<Link to={route.forgotPassword.path}>{route.forgotPassword.title}</Link>
			</FieldGroup>
		</Form>
	);
});

export default SignUpPage;
